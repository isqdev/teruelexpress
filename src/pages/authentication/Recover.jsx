import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { Eye, EyeSlash, UserList, LockSimpleOpen, CheckCircle } from "phosphor-react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
  
  const [showCodeScreen, setShowCodeScreen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(recoverSchema),
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    console.log("enviado...");
    localStorage.setItem('recoveData', JSON.stringify(data));
    setShowCodeScreen(true);
  };


  return (
    <>

      {showCodeScreen ? (
        <Code onBackToEmail={() => setShowCodeScreen(false)}/>
      ) : (
      <SectionBox className="pt-0">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CloudinaryImage publicId="vfq6dw8u2de9vcybxvka" className="w-64 justify-self-center" />
        <h4 className="font-bold text-center py-7 cursor-default">Recupere sua conta</h4>
        <div className="flex flex-col mt-6">
          <InputLabel>Email</InputLabel>
          <InputRoot>
            <InputField 
              placeholder="Digite seu email" {...register("email")}/>
          </InputRoot>
          <InputMessage className="text-danger-base">{errors.email?.message}</InputMessage>
          <Button type="submit" className="bg-red-tx text-center mt-4">
            <ButtonText className="text-white text-center"> 
              Enviar código
            </ButtonText>
          </Button>
        </div>
      </form>
    </SectionBox>
      )}
    </>
  );

}

function Code({ onBackToEmail }){

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(codeSchema),
    mode: "onBlur"
  });

  const [showPasswordScreen, setShowPasswordScreen] = useState(false);
  
  const onSubmitCode = (data) => {
    console.log("Código válido:");
    localStorage.setItem('codeData', JSON.stringify(data));
    setShowPasswordScreen(true);
  };
  return (
    <>

    {showPasswordScreen ? (
        <PasswordScreen />
      ) : (
      <SectionBox className="pt-0">
        <form onSubmit={handleSubmit(onSubmitCode)} noValidate>
        <CloudinaryImage publicId="vfq6dw8u2de9vcybxvka" className="w-64 justify-self-center" />
        <h4 className="font-bold text-center py-7 cursor-default">Recupere sua conta</h4>
        <div className="flex flex-col items-center">
        <div className="flex flex-col ">
          <InputLabel className=" text-left">Código</InputLabel>
          <Controller
              name="code"
              control={control}
              render={({ field }) => (
          <InputOTP maxLength={6} {...field}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator className="invisible"/>
          <InputOTPGroup>
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={4} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={5} />
          </InputOTPGroup>
          </InputOTP>
              )} />
          <InputMessage className="text-danger-base">{errors.code?.message}</InputMessage>
          <Countdown />
          <Button className="bg-red-tx text-center">
            <ButtonText className="text-white text-center"> 
              Confirmar
            </ButtonText>
          </Button>
          <p className="text-center leading-none"><span className="text-sm">Código enviado para</span><br/>
          <span className="text-xs ">cliente@gmail.com</span></p>
          <p className="text-center mt-1 cursor-pointer"
              onClick={onBackToEmail}
            >
              <span className="text-base font-bold">Mudar email</span>
            </p>
        </div>
        </div>
        </form>
        
      </SectionBox>
      )}
    </>
  );
}

function PasswordScreen(){
  const { control, handleSubmit,register, formState: { errors, touchedFields } } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur"
  });

 
  
  const onSubmitPassword = (data) => {
    console.log("Código válido:");
    localStorage.setItem('passwordData', JSON.stringify(data));
    
  };
  return (
    <>
      <SectionBox className="pt-0">
          <form onSubmit={handleSubmit(onSubmitPassword)} noValidate clas>
            <CloudinaryImage publicId="vfq6dw8u2de9vcybxvka" className="w-64 justify-self-center" />
            <h4 className="font-bold text-center py-7 cursor-default">Recupere sua conta</h4>
            <div className="mb-3 mt-5">
            <FormField
              register={register}
              name="password"
              title="Nova senha"
              type="password"
              error={errors.password}
            />
            </div>
            <div className="mb-4">
            <FormField
              register={register}
              name="newPassword"
              title="Confirmar nova senha"
              type="password"
              error={errors.newPassword}
            />
            </div>
            <Link to="/login">
            <Button className="bg-red-tx text-center">
            <ButtonText className="text-white text-center"> 
              Salvar
            </ButtonText>
            </Button>
            </Link>
          </form>
      </SectionBox>
    </>
  )
}

const Countdown = () => {
  const [seconds, setSeconds] = useState(60); 
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isActive]);

  
  const handleResend = () => {
    setSeconds(60);
    setIsActive(true);
  };

  return (
    <p
      className={`text-center font-bold my-2  ${seconds === 0 ? "cursor-pointer" : ""}`}
      onClick={seconds === 0 ? handleResend : null}
    ><span className="text-base">
      {seconds === 0 ? "Reenviar código" : `Enviar código novamente (${seconds}s)`}
      </span>
    </p>
  );
};


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



const recoverSchema = z.object({
  email: z
    .string()
    .nonempty("O campo de email não pode ser vazio.")
    .email("Por favor, digite um email válido."),
});

const codeSchema = z.object({
  code: z
    .string()
    .nonempty("O campo não pode ser vazio.")
    .length(6, "Por favor, preencha todos os 6 dígitos."),
});

const passwordSchema = z.object({
  password: z
      .string()
      .nonempty("Campo obrigatório")
      .min(8, "Mínimo de 8 caracteres")
      .refine((val) => /[A-Z]/.test(val), { message: "Deve conter ao menos 1 letra maiúscula" })
      .refine((val) => /[0-9]/.test(val), { message: "Deve conter ao menos 1 número" })
      .refine((val) => /[@#$?]/.test(val), { message: "Deve conter ao menos 1 caractere especial (@, #, $, ?)" }),
    newPassword: z.string().nonempty("Campo obrigatório"),
  }).refine((data) => data.password === data.newPassword, {
    message: "As senhas não coincidem",
    path: ["newPassword"],
});
  