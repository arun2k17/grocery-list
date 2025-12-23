# NFC Debugging Guide

## How to View Console Logs on Android

### Method 1: Chrome DevTools (Recommended)

1. On your computer, open Chrome
2. Go to `chrome://inspect`
3. Connect your Android phone via USB
4. Enable USB debugging on Android (Settings → Developer Options → USB Debugging)
5. Your phone's Chrome tabs will appear under "Remote Target"
6. Click "inspect" on the grocery list app
7. Console logs will appear in the DevTools

### Method 2: On-Device Console (Easier but limited)

1. Open the app on Android Chrome
2. Type in the URL bar: `chrome://inspect`
3. Find your tab and click "Inspect"

## What to Look For

When you tap the buttons, you should see console logs like:

### Share Flow (Person A)

```
[App] Share button clicked { selectedCount: 5 }
[NFC Write] Starting... { itemCount: 5 }
[NFC Write] Status set to writing
[NFC Write] Data prepared: { length: 234, preview: '{"tomato":true,"onion":true,...' }
[NFC Write] Calling write()...
[NFC Write] ✓ Write successful!
```

### Receive Flow (Person B)

```
[App] Receive button clicked
[NFC Read] Starting scan...
[NFC Read] Status set to reading
[NFC Read] Calling scan()...
[NFC Read] ✓ Scan started, waiting for tag...
[NFC Read] ✓ Tag detected! { recordCount: 1, serial: '04:A1:...' }
[NFC Read] First record: { recordType: 'text', dataLength: 234 }
[NFC Read] Decoded text: { length: 234, preview: '{"tomato":true,...' }
[NFC Read] ✓ Parsed data: { itemCount: 5 }
[App] Data received: { itemCount: 5 }
[App] Merged selections: { prevCount: 2, receivedCount: 5, mergedCount: 7 }
```

## Common Errors to Watch For

### 1. NotAllowedError

```
[NFC Write] ✗ Error: NotAllowedError
```

**Cause**: User denied NFC permissions  
**Fix**: Grant permissions when prompted, or go to Site Settings → Permissions → NFC

### 2. NotSupportedError

```
[NFC Write] ✗ Error: NotSupportedError
```

**Cause**: NFC not available on device or browser  
**Fix**: Ensure using Chrome on Android with NFC hardware

### 3. InvalidStateError

```
[NFC Write] ✗ Error: InvalidStateError
```

**Cause**: NFC is disabled on device  
**Fix**: Enable NFC in Android settings

### 4. NetworkError

```
[NFC Write] ✗ Error: NetworkError
```

**Cause**: Page not served over HTTPS (or localhost)  
**Fix**: Ensure using GitHub Pages HTTPS URL

### 5. No tag detected

```
[NFC Read] ✓ Scan started, waiting for tag...
(nothing happens after tapping)
```

**Possible causes**:

- Phones not aligned properly (NFC antennas are usually at the top back)
- One phone's screen is off
- Tapping too quickly
- NFC on one device is off

## Testing Checklist

- [ ] Buttons appear on mobile Chrome
- [ ] "Share" button is disabled when no items selected
- [ ] Clicking "Share" shows "📱 Hold steady..." text
- [ ] Clicking "Receive" shows "📱 Tap phone..." text
- [ ] Console shows `[NFC Write] Starting...` when clicking Share
- [ ] Console shows `[NFC Read] Starting scan...` when clicking Receive
- [ ] Console shows `✓ Scan started, waiting for tag...`
- [ ] Error messages appear on screen if something fails
- [ ] Error messages show technical details (name + message)

## Tips for Successful NFC Tap

1. **Person A first**: Click "Share" button, wait for "Hold steady..." message
2. **Person B second**: Click "Receive" button on their phone
3. **Alignment matters**: Hold phones back-to-back, top area where NFC antennas usually are
4. **Stay still**: Keep phones touching for 2-3 seconds
5. **Close distance**: Phones should be within 1-2 cm
6. **Screen stays on**: Both screens should remain active during tap

## Next Steps

1. Open Chrome DevTools as described above
2. Test the Share button
3. Copy all console logs and send them to me
4. Test the Receive button
5. Copy those console logs too
6. Take screenshots of any error messages that appear on screen

This will help us identify exactly where the NFC flow is breaking!
