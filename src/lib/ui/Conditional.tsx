export function Conditional({ condition, children } :
    { condition: boolean, children: React.ReactNode }) {
    return  condition ?  children : <></>;
}