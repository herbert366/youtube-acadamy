interface Props {
  id: string
  className?: string
}

export default function Video({ id, className }: Props) {
  return (
    <iframe
      width="100%"
      height="100%"
      src={'https://www.youtube.com/embed/' + id}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      frameBorder={0}
    ></iframe>
  )
}
