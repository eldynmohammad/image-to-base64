<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import HeaderComponent from "./components/HeaderComponent.vue";
import ConvertedItem from "./components/ConvertedItem.vue";
import FooterComponent from "./components/FooterComponent.vue";

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

const isFileImage = (file) => {
    return file && file["type"].split("/")[0] === "image";
};

const handleEvent = (event) => {
    if (["loadend", "load"].includes(event.type)) {
        imagePreview.value = event.target.result;
        imageB64.value = event.target.result;
    }

    // if (event.type === "progress") {
    //     currentProgress.value = `${(event.loaded / event.total) * 100}%`;
    // }
};

const addListener = (reader) => {
    reader.addEventListener("loadstart", handleEvent);
    reader.addEventListener("loadend", handleEvent);
    reader.addEventListener("progress", handleEvent);
    reader.addEventListener("error", handleEvent);
    reader.addEventListener("abort", handleEvent);
};

const uploadFile = (event) => {
    let selectedFile = event.target.files[0];
    if (isFileImage(selectedFile)) {
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            addListener(reader);
            reader.readAsDataURL(selectedFile);
            reader.onerror = (error) => reject(error);
        });
    } else {
        Toast.fire({
            icon: "error",
            title: "The file must be an image!",
        });
    }
};

const clear = () => {
    imagePreview.value = "";
    imageB64.value = "";
};
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <HeaderComponent />
        <div class="px-6 flex-1">
            <div
                class="max-w-4xl p-6 mx-auto my-8 sm:my-16 bg-white rounded-3xl"
            >
                <div class="flex flex-col gap-6 sm:flex-row">
                    <div class="flex-shrink-0 w-full sm:flex-1">
                        <div class="flex items-center justify-between">
                            <label
                                class="block text-xs uppercase tracking-wider font-semibold text-gray-500 px-1.5 py-2"
                            >
                                Image Preview
                                <span
                                    class="text-xs normal-case opacity-70 font-normal"
                                >
                                    (Your image won't be stored anywhere)
                                </span>
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
                            class="relative mt-2 overflow-hidden border border-gray-300 border-dashed bg-gray-100 rounded-2xl group hover:bg-gray-200 custom-animation"
                        >
                            <input
                                name="image-form"
                                @change="uploadFile"
                                type="file"
                                accept="image/*"
                                class="absolute inset-0 z-10 outline-none opacity-0 cursor-pointer"
                                placeholder="Lorem Pisum"
                            />
                            <div
                                v-if="imagePreview"
                                class="relative grid place-content-center"
                            >
                                <img
                                    :src="imagePreview"
                                    class="object-contain w-auto h-full max-h-96"
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
                    <div class="flex-shrink-0 w-full space-y-6 sm:flex-1">
                        <ConvertedItem
                            label="Base64 String"
                            :b64Data="
                                imageB64.toString().replace(/^data:(.*,)?/, '')
                            "
                        />
                        <ConvertedItem label="URL Data" :b64Data="imageB64" />
                    </div>
                </div>
            </div>
        </div>
        <FooterComponent />
    </div>
</template>
