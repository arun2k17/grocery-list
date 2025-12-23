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
        if (!isSupported) {
            setError({ message: 'NFC not supported in this browser' });
            setStatus('error');
            return;
        }

        try {
            setStatus('writing');
            setError(null);

            const ndef = new NDEFReader();
            const message = {
                records: [{
                    recordType: "text",
                    data: JSON.stringify(data)
                }]
            };

            await ndef.write(message);
            setStatus('success');

            // Auto-reset after 2 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 2000);
        } catch (err: unknown) {
            console.error('NFC write error:', err);
            const error = err as Error;
            setError({
                message: error.message || 'Failed to write NFC data',
                code: error.name
            });
            setStatus('error');

            // Auto-reset error after 3 seconds
            setTimeout(() => {
                setStatus('idle');
                setError(null);
            }, 3000);
        }
    }, [isSupported]);

    const readData = useCallback(async (onData: (data: SelectedItems) => void) => {
        if (!isSupported) {
            setError({ message: 'NFC not supported in this browser' });
            setStatus('error');
            return;
        }

        try {
            setStatus('reading');
            setError(null);

            const ndef = new NDEFReader();
            await ndef.scan();

            ndef.onreading = (event: NDEFReadingEvent) => {
                try {
                    const record = event.message.records[0];
                    const textDecoder = new TextDecoder();
                    const text = textDecoder.decode(record.data);
                    const data = JSON.parse(text) as SelectedItems;

                    onData(data);
                    setStatus('success');

                    // Auto-reset after 2 seconds
                    setTimeout(() => {
                        setStatus('idle');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to parse NFC data:', err);
                    setError({ message: 'Invalid data received' });
                    setStatus('error');
                }
            };

            ndef.onerror = (err: Error) => {
                console.error('NFC read error:', err);
                setError({
                    message: err.message || 'Failed to read NFC data',
                    code: err.name
                });
                setStatus('error');

                setTimeout(() => {
                    setStatus('idle');
                    setError(null);
                }, 3000);
            };

        } catch (err: unknown) {
            console.error('NFC scan error:', err);
            const error = err as Error;
            setError({
                message: error.message || 'Failed to start NFC scan',
                code: error.name
            });
            setStatus('error');

            setTimeout(() => {
                setStatus('idle');
                setError(null);
            }, 3000);
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
