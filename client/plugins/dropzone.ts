import { VNode } from "vue";
import { useUploadAbleFile } from "@/composables";
//TODO Remove any types
export default defineNuxtPlugin(({ vueApp }) => {
  const DropZoneDirective = {
    created(el: HTMLElement, binding: any, vnode: VNode) {
      el.ondragover = onDragOver;
      el.ondragstart = onDragStart;
      el.ondragleave = onDragLeave;
      el.ondrop = (e) => onDrop(e, el, binding, vnode);
    },
    onUnmounted(el: HTMLElement, binding: any, vnode: VNode) {
      el.removeEventListener("dragover", onDragOver);
      el.removeEventListener("dragstart", onDragStart);
      el.removeEventListener("dragleave", onDragLeave);
      el.removeEventListener("drop", (e) => onDrop(e, el, binding, vnode));
    },
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const onDragStart = (e: DragEvent) => {
    e.preventDefault();
  };
  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent, el: HTMLElement, binding: any, vnode: any) => {
    e.preventDefault();
    const { addFiles, files } = useUploadAbleFile();
    addFiles(e.dataTransfer?.files ?? null);
    if (vnode.componentInstance) {
      vnode.componentInstance.$emit("uploaded_files", { detail: files });
    } else {
      el.dispatchEvent(new CustomEvent("uploaded_files", { detail: files }));
    }
  };

  vueApp.directive("ada-drop-zone", DropZoneDirective);
});
