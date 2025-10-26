import React from 'react';


type Props = {
open: boolean;
title: string;
description?: string;
onConfirm: () => void;
onClose: () => void;
};


export default function ConfirmDialog({ open, title, description, onConfirm, onClose }: Props) {
if (!open) return null;
return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
<div className="bg-white dark:bg-neutral-900 rounded-xl max-w-sm w-full p-6 space-y-4">
<h3 className="text-lg font-semibold">{title}</h3>
{description && <p className="text-sm text-neutral-600 dark:text-neutral-300">{description}</p>}
<div className="flex justify-end gap-2">
<button className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800" onClick={onClose}>Cancel</button>
<button className="px-3 py-2 rounded-lg bg-red-600 text-white" onClick={() => { onConfirm(); onClose(); }}>Delete</button>
</div>
</div>
</div>
);
}