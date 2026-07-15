// Helpers for turning uploaded files into something that can survive in
// localStorage. Real file storage (S3/local disk) should replace this once
// a backend exists — see the Platform Specification's Media Privacy section.

// Rough safe ceiling per file so a handful of entries don't blow the ~5-10MB
// localStorage quota. Files above this are still usable for the current
// session (via an object URL) but won't survive a page refresh.
export const MAX_PERSISTABLE_BYTES = 2 * 1024 * 1024; // 2MB

export function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

export function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
