
interface GreetingProps {
    name?: string;
}

export default function Greeting({ name }: GreetingProps) {
  return <p>Bonjour, {name ?? 'invité'}</p>
}
