type ButtonProps = {
    children: string;
    text?: string;
    numero?: number;
}

export function Button(props: ButtonProps)

{
    return(
        <button>{props.numero || 0} {props.children || 'Default'}</button>
    )
}
