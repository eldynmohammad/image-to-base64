<script setup>
import Swal from "sweetalert2";

const props = defineProps({
    label: String,
    b64Data: String,
});

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const copyText = (val) => {
    if (val) {
        navigator.clipboard.writeText(val);
        Toast.fire({
            icon: "success",
            title: "Text copied successfully",
        });
    } else {
        Toast.fire({
            icon: "error",
            title: "No Base64 found",
        });
    }
};
</script>

<template>
    <div>
        <div class="flex items-center justify-between">
            <label
                class="block text-xs uppercase tracking-wider font-semibold text-gray-500 px-1.5 py-2"
            >
                {{ props.label }}
            </label>
            <button
                class="px-4 py-1 text-xs font-semibold text-gray-700 duration-300 border rounded-full bg-gray-50 hover:bg-gray-300"
                @click.stop="copyText(props.b64Data)"
                aria-label="Copy base64 string"
            >
                Copy
            </button>
        </div>
        <div
            class="h-48 px-4 py-2 mt-2 overflow-x-hidden overflow-y-auto text-lg bg-white border rounded-2xl"
        >
            <p
                v-if="props.b64Data"
                class="break-words text-slate-600"
                style="word-break: break-all"
            >
                {{ props.b64Data }}
            </p>
        </div>
    </div>
</template>
