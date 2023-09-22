import { useRef } from "react";

function useForm(initialValues, apiFunc) {
    const valuesRef = useRef(initialValues)

    const onChangeValue = (e) => {
        valuesRef.current[e.target.name] = e.target.value
    }

    const submit = async () => {
        return await apiFunc(...Object.values(valuesRef.current))
    }

    return {values: valuesRef.current, onChangeValue, submit};
}

export default useForm;