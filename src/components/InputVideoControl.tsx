import { useVideoStore } from '../store/VideoStore'

interface InputControlProps {
  onChange: (percent: number) => void
  value: number
}

export function InputControl({ onChange }: InputControlProps) {
  const value = useVideoStore(state => state.inputControlValue)
  const setInputControlValue = useVideoStore(
    state => state.setInputControlValue
  )

  return (
    <input
      type="range"
      name=""
      id=""
      className="w-full"
      min={0}
      max={100}
      step={0.2}
      value={value}
      onChange={e => {
        // console.log(Number(e.target.value))
        onChange(Number(e.target.value))
        setInputControlValue(Number(e.target.value))
        // setValue(Number(e.target.value))
      }}
    />
  )
}
