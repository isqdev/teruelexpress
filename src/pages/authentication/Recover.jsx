import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { Eye, EyeSlash, UserList, LockSimpleOpen, CheckCircle } from "phosphor-react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionBox } from "@/components";
import { CloudinaryImage } from "@/components/CloudinaryImage.jsx";
import { useNavigate } from "react-router-dom";
import RecoverService from "../../services/RecoverService";
import RecoverPessoaService from "../../services/RecoverPessoaService";
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { toast, Toaster } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function Recover() {

  const [showCodeScreen, setShowCodeScreen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(recoverSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    try {
      setIsWaiting(true);
      console.log("enviado...");
      const resposta = await gerarCodigo(data);
      console.log("resposta backend:", resposta);
      localStorage.setItem("recoverData", JSON.stringify(data));
      setShowCodeScreen(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Email nao encontrado");
      const message = error.response?.data?.message || "Não foi posivel gerar o codigo";
      setError("email", { type: "server", message });
    } finally {
      setIsWaiting(false);
    }
  };

  const gerarCodigo = async (pessoa) => {
    return await RecoverService.gerarCodigo(pessoa);
  };



  return (
    <>

      {showCodeScreen ? (
        <Code onBackToEmail={() => setShowCodeScreen(false)} />
      ) : (
        <SectionBox className="pt-0">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CloudinaryImage publicId="vfq6dw8u2de9vcybxvka" className="w-64 justify-self-center" />
            <h4 className="font-bold text-center py-7 cursor-default">Recupere sua conta</h4>
            <div className="flex flex-col mt-6">
              <InputLabel>Email</InputLabel>
              <InputRoot>
                <InputField
                  placeholder="Digite seu email" {...register("email")} />
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

function Code({ onBackToEmail }) {

  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(codeSchema),
    mode: "onBlur"
  });

  const [isWaiting, setIsWaiting] = useState(false);
  const [showPasswordScreen, setShowPasswordScreen] = useState(false);
  const [items, setItems] = useState({});

  useEffect(() => {
    loadReviewsLocalStorage();
  }, []);

  const loadReviewsLocalStorage = () => {
    try {
      const storedReviews = localStorage.getItem('recoverData');
      if (storedReviews) {
        const reviews = JSON.parse(storedReviews);


        const itemsUser = {
          email: reviews.email,
        };
        setItems(itemsUser);
      }

    } catch (error) {
      console.error("Erro ao carregar  'jsonReview' do localStorage:", error);
      setItems();
    }
  }

  const onSubmitCode = async (data) => {
    try {
      setIsWaiting(true);
      console.log("validando código...", data);
      const recoverData = JSON.parse(localStorage.getItem("recoverData"));
      const email = recoverData?.email;
      const payload = {
        code: data.code,
      };
      const resposta = await RecoverService.validarCodigo(email, payload);
      console.log("resposta backend:", resposta);
      localStorage.setItem("codeData", JSON.stringify(payload));
      setShowPasswordScreen(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Erro ao validar código");
      const message = error.response?.data?.message || "Código inválido";
      setError("code", { type: "server", message });
    } finally {
      setIsWaiting(false);
    }
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
                      <InputOTPSeparator className="invisible" />
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
                <p className="text-center leading-none"><span className="text-sm">Código enviado para</span><br />
                  <span className="text-xs ">{items.email}</span></p>
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

function PasswordScreen() {
  const navigate = useNavigate();

  const [isWaiting, setIsWaiting] = useState(false);
  const { control, handleSubmit, register, formState: { errors, touchedFields } } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur"
  });



  const onSubmitPassword = async (data) => {
    try {
      setIsWaiting(true);
      console.log("atualizando senha...", data);
      const recoverData = JSON.parse(localStorage.getItem("recoverData"));
      const email = recoverData?.email;
      const payload = {
        senha: data.password,
      };
      const resposta = await RecoverPessoaService.atualizarSenha(email, payload);
      console.log("resposta backend:", resposta);

      toast.success("Senha atualizada com sucesso");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Erro ao atualizar senha");
      const message = error.response?.data?.message || "Erro";
      setError("password", { type: "server", message });
    } finally {
      setIsWaiting(false);
    }
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

          <Button className="bg-red-tx text-center">
            <ButtonText className="text-white text-center">
              Salvar
            </ButtonText>
          </Button>

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
