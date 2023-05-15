import { Field, Form, Formik } from 'formik'

type Data = {
  initialValue?: unknown
  type: string
  block?: boolean
}

export type DataObj = Record<
  string,
  { initialValue?: unknown; type: string; block?: boolean; hide?: boolean }
>

interface Props {
  title: string
  data: DataObj
  onSubmit: (values: {
    [K in keyof DataObj]: DataObj[K]['initialValue']
  }) => void
  isCol?: boolean
  onRequestClose?: () => void
}

export default function CrudForm({
  title,
  data,
  onSubmit,
  isCol,
  onRequestClose,
}: Props) {
  isCol = isCol ?? true

  return (
    <div
      className="fixed top-0 left-0 z-40 w-screen h-screen bg-slate-900/80"
      onClick={onRequestClose}
    >
      <div
        className="bg-slate-800 p-10 w-fit fixed top-0 left-0 right-0 bottom-0 m-auto z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-fit max-h-full"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <head className="flex justify-between">
          <h1>{title}</h1>
          <button
            onClick={onRequestClose}
            className="p-2 bg-red-500 rounded-xl absolute top-0 right-0"
          >
            Close
          </button>
        </head>
        <Formik
          initialValues={Object.fromEntries(
            Object.entries(data).map(d => [d[0], d[1]?.initialValue || ''])
          )}
          onSubmit={onSubmit}
        >
          <Form className={`flex gap-5 ${isCol ? 'flex-col' : ''}`}>
            {/* <Field name="name" type="text" /> */}
            {/* <Field name="email" type="email" /> */}
            {Object.entries(data)
              .map(d => [d[0], d[1].type, d[1].hide])
              .map(([key, type]) => (
                <div className="flex gap-6 bg-slate-500 p-2">
                  <label htmlFor={key as string}>{key}</label>
                  <Field name={key} type={type} key={key} disable={true} />
                </div>
              ))}
            <button
              type="submit"
              className="bg-green-800/60 p-2"
              // onClick={onRequestClose}
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
