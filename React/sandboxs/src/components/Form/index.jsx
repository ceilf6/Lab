import React from 'react';
import { useController, useForm } from 'react-hook-form';
import Input from '../Input';

function getFieldName(index) {
    return `field_${index}`;
}

const FormField = React.memo(function FormField({ control, name, legend }) {
    const { field } = useController({
        name,
        control,
        defaultValue: ''
    });

    return (
        <Input
            legend={legend}
            value={field.value}
            transform={field.onChange}
        />
    );
});

function Form({ legend }) {
    const legendList = React.useMemo(() => {
        return legend && legend.length ? legend : ['用户名'];
    }, [legend]);

    const defaultValues = React.useMemo(() => {
        return legendList.reduce((result, _item, index) => {
            result[getFieldName(index)] = '';
            return result;
        }, {});
    }, [legendList]);

    const { control, handleSubmit, reset } = useForm({
        defaultValues
    });

    React.useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const onSubmit = React.useCallback(
        (formValues) => {
            const values = legendList.map((_, index) => formValues[getFieldName(index)]);
            console.log(`你要提交的内容为：${values}`);
        },
        [legendList]
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {legendList.map((item, index) => (
                <FormField
                    key={`${item}-${index}`}
                    control={control}
                    legend={item}
                    name={getFieldName(index)}
                />
            ))}
            <button type="submit">submit</button>
        </form>
    );
}

export default Form;
