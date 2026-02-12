import { ref } from 'vue'

export default () => {
    const ModalVisibleRef = ref(false)

    return {
        ModalVisible: ModalVisibleRef
    }
}