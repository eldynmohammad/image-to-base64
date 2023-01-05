<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

const imagePreview = ref("");
const imageB64 = ref("");

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

const uploadFile = (event) => {
    let file = event.target.files;
    if (file && file[0]) {
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = (e) => {
                imagePreview.value = e.target.result;
                imageB64.value = reader.result;
            };
            reader.onerror = (error) => reject(error);
        });
    }
};

const copyText = (val) => {
    navigator.clipboard.writeText(val);
    Toast.fire({
        icon: "success",
        title: "Text copied successfully",
    });
};

const clear = () => {
    imagePreview.value = "";
    imageB64.value = "";
};
</script>

<template>
    <header class="flex items-center h-20 bg-white">
        <nav class="w-full max-w-4xl p-6 mx-auto font-semibold">
            <div class="text-xl">
                <span>Image</span>
                <span class="opacity-30">to</span>
                <span class="text-indigo-500">Base64</span>
            </div>
        </nav>
    </header>
    <div class="max-w-4xl min-h-screen p-6 mx-auto mt-8 text-gray-800">
        <div class="flex flex-col gap-6 sm:flex-row">
            <div class="flex-shrink-0 w-full sm:w-1/2">
                <div class="flex items-center justify-between">
                    <label
                        class="block text-xs uppercase tracking-wider font-semibold text-gray-500 px-1.5 py-2"
                    >
                        image
                    </label>
                    <button
                        v-if="imagePreview && imageB64"
                        class="px-4 py-1 text-xs font-semibold text-gray-100 duration-300 border rounded-full bg-rose-500 hover:opacity-75"
                        @click.stop="clear"
                        aria-label="Clear everything"
                    >
                        Delete
                    </button>
                </div>

                <div
                    for="image-form"
                    class="relative mt-2 overflow-hidden border border-gray-300 border-dashed bg-gray-50 rounded-2xl group hover:bg-gray-200 custom-animation"
                >
                    <input
                        name="image-form"
                        @change="uploadFile"
                        type="file"
                        class="absolute inset-0 z-10 outline-none opacity-0 cursor-pointer"
                        placeholder="Lorem Pisum"
                    />
                    <div
                        v-if="imagePreview"
                        class="relative grid place-content-center"
                    >
                        <img
                            :src="imagePreview"
                            class="object-contain w-auto max-h-96 sm:max-h-max sm:w-full sm:h-auto"
                        />
                        <div
                            class="absolute top-0 left-0 text-xs bg-gray-800/40 px-4 py-2.5 rounded-br-xl pointer-events-none"
                        >
                            <span class="text-white opacity-75">
                                Click the image to change
                            </span>
                        </div>
                    </div>
                    <p
                        v-else
                        class="w-full py-[13.5rem] text-xs tracking-wider text-center uppercase opacity-60"
                    >
                        Click here to upload an image
                    </p>
                </div>
            </div>
            <div class="flex-shrink-0 w-full space-y-6 sm:w-1/2">
                <div>
                    <div class="flex items-center justify-between">
                        <label
                            class="block text-xs uppercase tracking-wider font-semibold text-gray-500 px-1.5 py-2"
                        >
                            Base 64 String
                        </label>
                        <button
                            class="px-4 py-1 text-xs font-semibold text-gray-700 duration-300 border rounded-full bg-gray-50 hover:bg-gray-300"
                            @click.stop="
                                copyText(
                                    imageB64
                                        .toString()
                                        .replace(/^data:(.*,)?/, '')
                                )
                            "
                            aria-label="Copy base64 string"
                        >
                            Copy
                        </button>
                    </div>
                    <div
                        class="h-48 px-4 py-2 mt-2 overflow-x-hidden overflow-y-auto text-lg bg-white border rounded-2xl"
                    >
                        <p
                            class="break-words text-slate-600"
                            style="word-break: break-all"
                        >
                            {{
                                imageB64.toString().replace(/^data:(.*,)?/, "")
                            }}
                        </p>
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label
                            class="block text-xs uppercase tracking-wider font-semibold text-gray-500 px-1.5 py-2"
                        >
                            HTML Code
                        </label>
                        <button
                            class="px-4 py-1 text-xs font-semibold text-gray-700 duration-300 border rounded-full bg-gray-50 hover:bg-gray-300"
                            @click.stop="copyText(imageB64)"
                            aria-label="Copy base64 code"
                        >
                            Copy
                        </button>
                    </div>
                    <div
                        class="h-48 px-4 py-2 mt-2 overflow-x-hidden overflow-y-auto text-lg bg-white border rounded-2xl"
                    >
                        <p
                            class="break-words text-slate-600"
                            style="word-break: break-all"
                        >
                            {{ imageB64 }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
