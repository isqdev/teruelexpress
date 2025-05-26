import { SectionBox } from "@/components"
import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { Eye, EyeSlash, UserList, Phone, EnvelopeSimple, LockSimpleOpen, CheckCircle, HouseLine } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox"

export function SignUpPage() {
  const [data, setData] = useState("Dados do Formulario em JSON");
  const [isBusiness, setIsBusiness] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChangedPerson = (business) => {
    if (isBusiness !== business) {
      setIsBusiness(business);
    }
  }

  const postForm = (/*formData*/) => {
    /*setData({ ...formData });
    console.log("JSON enviado:", formData);*/
    setShowSuccessModal(true);
  };

  const handleTermsModal = () => {
    setShowTermsModal(true);
  }

  return (
    <>
      <SectionBox>
        <Image src="src\assets\logo.jpg" className="w-48 justify-self-center" />
        <h3 className="justify-self-center">Crie sua conta!</h3>
        <div className="grid grid-cols-2 gap-4 py-6">
          <p className="font-bold col-span-2">Escolha uma opção</p>
          <Button className={isBusiness ? "bg-white border border-gray-600" : "bg-blue-tx"} onClick={() => handleChangedPerson(false)}>
            <ButtonText className={isBusiness ? "text-gray-600 text-center" : "text-white text-center"}>
              Pessoa Física
            </ButtonText>
          </Button>
          <Button className={isBusiness ? "bg-blue-tx" : "bg-white border border-gray-600"} onClick={() => handleChangedPerson(true)}>
            <ButtonText className={isBusiness ? "text-white text-center" : "text-gray-600 text-center"}>
              Empresa
            </ButtonText>
          </Button>
        </div>
        <form>
          <FormField
            title={isBusiness ? "Digite o nome da empresa" : "Seu nome"}
            placeholder={isBusiness ? "Digite o nome da empresa" : "Digite seu nome"}
            error="Nome invalido"
            icon={UserList}
          />

          <FormField
            title={isBusiness ? "CNPJ" : "CPF"}
            placeholder={isBusiness ? "Digite seu CNPJ" : "Digite seu CPF"}
            error={isBusiness ? "CNPJ invalido" : "CPF invalido"}
            type="number"
            icon={UserList}
          />

          <FormField
            title="Email"
            placeholder="Digite seu email"
            error="Email invalido"
            icon={EnvelopeSimple}
          />

          <FormField
            title="Telefone"
            placeholder="Digite seu telefone"
            error="Telefone invalido"
            type="number"
            icon={Phone}
          />

          <FormField
            title="Senha"
            placeholder="Crie uma senha"
            error="Senha fraca"
            type="password"
            icon={LockSimpleOpen}
          />

          <FormField
            title="Confirmar senha"
            placeholder="Confirme sua senha"
            error="Senhas diferentes"
            type="password"
            icon={LockSimpleOpen}
          />

          <div className="flex items-center gap-2">
            <Checkbox />
            <p onClick={handleTermsModal} className="cursor-pointer">Aceitar os termos e condições</p>
          </div>

          <div className="pt-4">
            <Button className="bg-red-tx" type="button" onClick={postForm}>
              <ButtonText className="text-center text-white">
                Criar conta
              </ButtonText>
            </Button>
          </div>
        </form>

        <div className="justify-items-center pt-6">
          <p className="text-center">Já possui uma conta Teruel Exepress?</p>
          <Link to="/login" className="text-red-tx font-bold">
            Entre aqui
          </Link>
        </div>
      </SectionBox>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-3">
          <Shape className="z-2 border border-gray-600 bg-white flex flex-col items-center max-w-xs gap-4">
            <CheckCircle className="icon size-24 text-success-light justify-self-center" weight="fill" />
            <h3 className="text-center text-lg font-semibold ">Conta criada</h3>
            <Link to="/home">
              <Button className="bg-white border border-gray-600">
                <HouseLine className="icon text-black" />
                <ButtonText className="text-black">Entrar</ButtonText>
              </Button>
            </Link>
          </Shape>
          <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw" />
        </div>
      )}

      {showTermsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-3">
          <Shape className="z-2 w-full min-h-screen sm:min-h-0 sm:max-w-lg sm:mx-auto sm:my-20 bg-white sm:rounded-2xl sm:h-fit overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-center text-lg font-semibold ">Termos e condições</h3>
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Button className="bg-white border border-gray-600" onClick={() => setShowTermsModal(false)}>
                <ButtonText className="text-black text-center">Fechar termos</ButtonText>
              </Button>
            </div>
          </Shape>
          <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw" />
        </div>
      )}
    </>
  )
}

function FormField({ title, placeholder, error, type = "text", icon: Icon }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <InputLabel>{title}</InputLabel>
      <InputRoot>
        <InputIcon>
          {Icon && <Icon className="icon" />}
        </InputIcon>
        <InputField
          placeholder={placeholder}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
        />
        {type === "password" && (
          <InputIcon onClick={() => setShowPassword((v) => !v)} className="cursor-pointer">
            {showPassword ? <Eye className="icon" /> : <EyeSlash className="icon" />}
          </InputIcon>
        )}
      </InputRoot>
      <InputMessage>{error}</InputMessage>
    </>
  )
}