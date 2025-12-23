import { useState, useCallback } from 'react';
import type { SelectedItems } from '../types';

// Web NFC API types
interface NDEFMessage {
    records: NDEFRecord[];
}

interface NDEFRecord {
    recordType: string;
    data: BufferSource;
}

interface NDEFReadingEvent {
    message: NDEFMessage;
    serialNumber: string;
}

interface NDEFWriteOptions {
    records: Array<{ recordType: string; data: string }>;
}

declare global {
    interface Window {
        NDEFReader: typeof NDEFReader;
    }

    class NDEFReader {
        scan(): Promise<void>;
        write(message: NDEFWriteOptions): Promise<void>;
        onreading: ((event: NDEFReadingEvent) => void) | null;
        onerror: ((error: Error) => void) | null;
    }
}

type NFCStatus = 'idle' | 'writing' | 'reading' | 'success' | 'error';

interface NFCError {
    message: string;
    code?: string;
}

interface UseNFCResult {
    status: NFCStatus;
    error: NFCError | null;
    isSupported: boolean;
    writeData: (data: SelectedItems) => Promise<void>;
    readData: (onData: (data: SelectedItems) => void) => Promise<void>;
    reset: () => void;
}

export function useNFC(): UseNFCResult {
    const [status, setStatus] = useState<NFCStatus>('idle');
    const [error, setError] = useState<NFCError | null>(null);

    // Check if NFC is supported
    const isSupported = 'NDEFReader' in window;

    const reset = useCallback(() => {
        setStatus('idle');
        setError(null);
    }, []);

    const writeData = useCallback(async (data: SelectedItems) => {
        console.log('[NFC Write] Starting...', { itemCount: Object.keys(data).length });
        if (!isSupported) {
            console.error('[NFC Write] Not supported');
            setError({ message: 'NFC not supported in this browser' });
            setStatus('error');
            return;
        }

        try {
            setStatus('writing');
            setError(null);
            console.log('[NFC Write] Status set to writing');

            const ndef = new NDEFReader();
            const jsonString = JSON.stringify(data);
            console.log('[NFC Write] Data prepared:', { length: jsonString.length, preview: jsonString.slice(0, 100) });

            const message = {
                records: [{
                    recordType: "text",
                    data: jsonString
                }]
            };

            console.log('[NFC Write] Calling write()...');
            await ndef.write(message);
            console.log('[NFC Write] ✓ Write successful!');
            setStatus('success');

            // Auto-reset after 2 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 2000);
        } catch (err: unknown) {
            console.error('[NFC Write] ✗ Error:', err);
            const error = err as Error;
            console.error('[NFC Write] Error details:', { name: error.name, message: error.message });
            setError({
                message: `${error.name}: ${error.message}`,
                code: error.name
            });
            setStatus('error');

            // Auto-reset error after 5 seconds (increased for reading)
            setTimeout(() => {
                setStatus('idle');
                setError(null);
            }, 5000);
        }
    }, [isSupported]);

    const readData = useCallback(async (onData: (data: SelectedItems) => void) => {
        console.log('[NFC Read] Starting scan...');
        if (!isSupported) {
            console.error('[NFC Read] Not supported');
            setError({ message: 'NFC not supported in this browser' });
            setStatus('error');
            return;
        }

        try {
            setStatus('reading');
            setError(null);
            console.log('[NFC Read] Status set to reading');

            const ndef = new NDEFReader();
            console.log('[NFC Read] Calling scan()...');
            await ndef.scan();
            console.log('[NFC Read] ✓ Scan started, waiting for tag...');

            ndef.onreading = (event: NDEFReadingEvent) => {
                console.log('[NFC Read] ✓ Tag detected!', { recordCount: event.message.records.length, serial: event.serialNumber });
                try {
                    const record = event.message.records[0];
                    console.log('[NFC Read] First record:', { recordType: record.recordType, dataLength: record.data.byteLength });

                    const textDecoder = new TextDecoder();
                    const text = textDecoder.decode(record.data);
                    console.log('[NFC Read] Decoded text:', { length: text.length, preview: text.slice(0, 100) });

                    const data = JSON.parse(text) as SelectedItems;
                    console.log('[NFC Read] ✓ Parsed data:', { itemCount: Object.keys(data).length });

                    onData(data);
                    setStatus('success');

                    // Auto-reset after 2 seconds
                    setTimeout(() => {
                        setStatus('idle');
                    }, 2000);
                } catch (err) {
                    console.error('[NFC Read] ✗ Parse error:', err);
                    const error = err as Error;
                    setError({ message: `Parse failed: ${error.message}` });
                    setStatus('error');
                }
            };

            ndef.onerror = (err: Error) => {
                console.error('[NFC Read] ✗ Read error event:', err);
                setError({
                    message: `${err.name}: ${err.message}`,
                    code: err.name
                });
                setStatus('error');

                setTimeout(() => {
                    setStatus('idle');
                    setError(null);
                }, 5000);
            };

        } catch (err: unknown) {
            console.error('[NFC Read] ✗ Scan failed:', err);
            const error = err as Error;
            console.error('[NFC Read] Error details:', { name: error.name, message: error.message });
            setError({
                message: `${error.name}: ${error.message}`,
                code: error.name
            });
            setStatus('error');

            setTimeout(() => {
                setStatus('idle');
                setError(null);
            }, 5000);
        }
    }, [isSupported]);

    return {
        status,
        error,
        isSupported,
        writeData,
        readData,
        reset,
    };
}
