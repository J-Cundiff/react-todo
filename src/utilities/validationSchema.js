import * as Yup from 'yup'

const todoSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Max 25 Characters').required('Required'),
    description: Yup.string().max(100, 'Max 100 Characters'),
    done: Yup.bool(),
    categoryId: Yup.number()
})

const catSchema = Yup.object().shape({
    categoryName: Yup.string().max(25, 'Max 25 Characters').required('Required'),
    categoryDescription: Yup.string().max(100, 'Max 100 Characters')
})

export { todoSchema }
export default catSchema