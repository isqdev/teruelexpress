import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { Eye, EyeSlash, UserList, LockSimpleOpen, CheckCircle } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionBox } from "@/components";
import { CloudinaryImage } from "@/components/CloudinaryImage.jsx";
import { cpf, cnpj } from 'cpf-cnpj-validator';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function Recover() {

  return (
    <>
      <SectionBox className="pt-0">
        <CloudinaryImage publicId="vfq6dw8u2de9vcybxvka" className="w-64 justify-self-center" />
        <h4 className="font-bold text-center py-7 cursor-default">Recupere sua conta</h4>
        <div className="flex flex-col items-center">
          <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
          </InputOTP>
        </div>
      </SectionBox>
    </>
  );

}

function FormField({ title, placeholder, register, name, error, dirty, type = "text", icon: Icon, onChangeMask, autoComplete = "off" }) {
  let status;
  if (dirty) {
    status = error ? "error" : "default"
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <InputLabel>{title}</InputLabel>
      <InputRoot status={status}>
        <InputIcon>
          {Icon && <Icon className="icon" />}
        </InputIcon>
        <InputField
          autoComplete={autoComplete}
          placeholder={placeholder}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          {...register(name, onChangeMask ? {
            onChange: (e) => {
              e.target.value = onChangeMask(e.target.value);
            }
          } : {})}
        />
        {type === "password" && (
          <InputIcon onClick={() => setShowPassword((v) => !v)} className="cursor-pointer">
            {showPassword ? <Eye className="icon" /> : <EyeSlash className="icon" />}
          </InputIcon>
        )}
      </InputRoot>
      <InputMessage className="text-danger-base">{error?.message}</InputMessage>
    </>
  )
}

function maskInput(value) {
  const onlyDigits = value.replace(/\D/g, '');

  if (onlyDigits.length <= 11) {
    // Máscara CPF: 000.000.000-00
    return onlyDigits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // Máscara CNPJ: 00.000.000/0000-00
    return onlyDigits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  }
}

const loginSchema = z.object({
  cpf_cnpj: z
    .string()
    .nonempty("Campo obrigatório")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      if (digits.length === 11) return cpf.isValid(digits);
      if (digits.length === 14) return cnpj.isValid(digits);
      return false;
    }, { message: "CPF ou CNPJ inválido" }),

  password: z
    .string()
    .nonempty("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres")
});