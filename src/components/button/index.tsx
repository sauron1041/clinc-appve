import React from "react";
import { Button as AntButton } from "antd";

export interface IButtonProps {
    label?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'middle' | 'large';

}

const Button: React.FC<IButtonProps> = ({ label, onClick, variant = 'primary', size = 'middle' }) => {
    const baseClass = `rounded font-medium hover:bg-primary/80`
    const variantClass = {
        primary: `bg-primary text-white hover:bg-primary/80`,
        secondary: `bg-secondary text-white hover:bg-secondary/80`,
        danger: `bg-danger text-white hover:bg-danger/80`
    }
    const sizeClass = {
        small: `px-2 py-1 text-xs`,
        middle: `px-3 py-2 text-sm`,
        large: `px-4 py-3 text-base`
    }

    return (
        <AntButton className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]}`} onClick={onClick}>{label}</AntButton>
    )
}

export default Button;