import { Button, ButtonText, InputRoot, InputField, InputIcon, InputLabel, InputMessage, AppHeader, 
  SectionApp, Shape, ModalConfirm, ModalSm } from "@/components";
import { Eye, EyeSlash, UserList, LockSimpleOpen, CheckCircle, Star, Package, HouseLine, StarHalf, 
  StarFour, FolderSimpleStar, Pencil, FloppyDiskBack, LockKeyOpen } from "phosphor-react";
import { useState, useEffect } from "react";
import { MyReviews } from "./MyReviews";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from "react-hook-form";

export function Settings() {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: errorsEdit },
  } = useForm({
    resolver: zodResolver(schemaEdit),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: zodResolver(schemaPassword),
  });


  const [isEditing, setIsEditing]= useState(false);
  const [isPassword, setIsPassword]= useState(false);
  const [items, setItems] = useState({});

  

  useEffect(() => {
    loadReviewsLocalStorage();
  }, []);

  const loadReviewsLocalStorage = () => {
      try {
        const storedReviews = localStorage.getItem('JSON enviado');
        if (storedReviews) {
          const reviews = JSON.parse(storedReviews);

         
          const itemsUser = {
            
            nomeCliente: reviews.namePerson || reviews.nameBusiness, 
            email: reviews.email,
            telefone: reviews.phone,
            senha: reviews.password, 
            documento:reviews.cpf || reviews.cnpj
          };
          setItems(itemsUser);
        } 
        
      } catch (error) {
        console.error("Erro ao carregar  'jsonReview' do localStorage:", error);
        setItems();
      }
  }
  
  const saveToLocalStorage = (data) => {
    console.log("Salvando dados de edição...");
    try {
      const storedReviews = localStorage.getItem('JSON enviado');
      const reviews = storedReviews ? JSON.parse(storedReviews) : {};
      reviews.namePerson = data.nome;
      reviews.email = data.email;
      reviews.phone = data.phone;
      localStorage.setItem('JSON enviado2', JSON.stringify(reviews));
      // setIsEditing(!isEditing);
      loadReviewsLocalStorage();
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  };

  const saveToLocalStoragePassword = (values) => {
    console.log("Salvando nova senha...");
    try {
      const storedReviews = localStorage.getItem('JSON enviado');
      const reviews = storedReviews ? JSON.parse(storedReviews) : {};
      reviews.password = values.password;
      localStorage.setItem('JSON enviado3', JSON.stringify(reviews));
      setIsPassword(!isPassword);
      loadReviewsLocalStorage();
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  };

  const onSubmitEdit = (data) => {
    saveToLocalStorage(data);
  }

  const onSubmitPassword = (values) => {
    saveToLocalStoragePassword(values);
  }


  const toggleEdit = () => {
 
    setIsEditing(!isEditing);
    
  };


  const togglePassword = () => {
    setIsPassword(!isPassword);
  }




  return (
    <>
      <SectionApp>
            <AppHeader screenTitle="Configurações"/>
            <div className="sm:shadow-2xl sm:mx-auto sm:rounded-xl sm:p-6 sm:w-full 
              sm:max-w-3xl sm:flex sm:justify-center sm:items-center">
            <div>
            <div className="flex ">
              <div className=" w-18 h-18 rounded-full  bg-gray-50 flex items-center justify-center text-center mr-3">
                <Pencil className="icon " />
              </div>
              <div className="gap-0">
                <p className="font-bold m-0 gap-0">Nome do cliente</p>
                <span className="font-bold text-xs m-0 gap-0">pessoa fisica</span>
                <p className="m-0 gap-0">000.000.000-00</p>
              </div>
            </div>
            <div className="sm:flex sm:gap-8">
            <div className="border border-2 rounded-2xl border-gray-600 mt-4">
              <form onSubmit={handleSubmit(onSubmitEdit)} className="m-2 ">
                <p className="font-bold mb-5">Dados da conta</p>
                <InputLabel>Nome</InputLabel>
                <InputRoot className={!isEditing ? "bg-gray-50" : ""} >
                  <InputField placeholder={items.nomeCliente} {...register("nome")}   
                  disabled={!isEditing} defaultValue={items.nomeCliente} />
                </InputRoot>
                <InputLabel>Email</InputLabel>
                <InputRoot className={!isEditing ? "bg-gray-50" : ""} >
                  <InputField placeholder={items.email} defaultValue={items.email} 
                  disabled={!isEditing} {...register("email")}/>
                </InputRoot>
                <InputLabel>Telefone</InputLabel>
                <InputRoot className={!isEditing ? "bg-gray-50" : ""} >
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...register("phone")}

                        {...field}
                        onChange={(e) => {
                          field.onChange(maskInput(e.target.value));
                        }}
                        disabled={!isEditing}
                      />
                      )}
                  />
                
                </InputRoot>
            <Button type={isEditing ? "submit" : "button"} onClick={!isEditing ? toggleEdit : null} className="ml-auto bg-blue-tx w-auto  mt-3">
                  <ButtonText className="text-center text-white flex">
                    {isEditing ? (
                      <>
                    <FloppyDiskBack className="icon mr-2" /> Salvar
                      </> 
                    ) : (
                      <>
                      <Pencil className="icon mr-2" /> Editar 
                      </>
                    )}
                  </ButtonText>
                </Button>
              </form>
            </div>
            <div className="border border-2 rounded-2xl border-gray-600 mt-4">
              <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="m-2 ">
                <p className="font-bold mb-5">Senha</p>
                <InputLabel>Senha atual</InputLabel>
                <InputRoot className={!isEditing ? "bg-gray-100" : ""} >
                  <InputField  disabled={!isPassword}/>
                </InputRoot >
                <InputLabel>Nova senha</InputLabel>
                <InputRoot className={!isEditing ? "bg-gray-100" : ""}>
                  <InputField disabled={!isPassword} {...registerPassword("password")} type="password" />
                </InputRoot>
                <InputLabel>Confirmar senha</InputLabel>
                <InputRoot className={!isEditing ? "bg-gray-100" : ""}>
                  <InputField disabled={!isPassword} {...registerPassword("confirmPassword")} type="password" />
                </InputRoot>
               

                <Button type={isPassword ? "submit" : "button"} onClick={!isPassword ? togglePassword : null}  
                  className="ml-auto bg-blue-tx w-auto  mt-3">
                  <ButtonText className="text-center text-white flex">
                    {isPassword ? (
                      <>
                    <FloppyDiskBack className="icon mr-2" /> Salvar
                      </>
                    ) : (
                      <>
                      <LockKeyOpen className="icon mr-2" /> Alterar senha
                      </>
                    )}
                  </ButtonText>
                </Button>
              </form>
              </div>
            </div> 
            </div>
            </div>

      </SectionApp>
    </>
  );
}

const schemaEdit = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  email: z
    .string()
    .email("Email inválido"),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 10 || val.length === 11, { message: "Telefone inválido" }),
});


const schemaPassword = z.object({
  password: z
    .string()
    .nonempty("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres")
    .refine((val) => /[A-Z]/.test(val), { message: "Deve conter ao menos 1 letra maiúscula" })
    .refine((val) => /[0-9]/.test(val), { message: "Deve conter ao menos 1 número" })
    .refine((val) => /[@#$?]/.test(val), { message: "Deve conter ao menos 1 caractere especial (@, #, $, ?)" }),
  confirmPassword: z.string().nonempty("Campo obrigatório"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});


function maskInput(value) {
  const onlyDigits = value.replace(/\D/g, '');

 
    if (onlyDigits.length > 10) {
      return onlyDigits
        .replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4')
        .replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2 $3-$4');
    }

    return onlyDigits
      .replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3')
      .replace(/^(\d{2})(\d{0,4})(\d{0,4})/, (match, ddd, first, last) => {
        if (!first) return ddd ? `(${ddd}` : '';
        if (!last) return `(${ddd}) ${first}`;
        return `(${ddd}) ${first}-${last}`;
      });
  

}
