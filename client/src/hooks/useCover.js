import api from "../api"
import { useAuthContext } from "../context/authContext"

function useCover() {
    const { user, updateProfile, updateCover } = useAuthContext()

    const handlePictureChange = async (e) => {
        const nameOfImg = e.target.getAttribute('name')
        const pictureFile = e.target.files[0]

        api.user.changePicture(user._id, nameOfImg, pictureFile)
            .then(res => {
                if (nameOfImg === "Cover") {
                    updateCover(res)
                } else {
                    updateProfile(res)
                }
            })
    }
    return {user, updateProfile, updateCover, handlePictureChange};
}

export default useCover;