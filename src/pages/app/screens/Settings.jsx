import { Button, ButtonText, InputRoot, InputField, InputIcon, InputLabel, InputMessage, AppHeader, SectionApp, Shape, ModalConfirm, ModalSm } from "@/components";
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
  reset,
  setValue,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
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
    console.log("oii");
    try {
      const storedReviews = localStorage.getItem('JSON enviado');
      const reviews = storedReviews ? JSON.parse(storedReviews) : {};

      // Atualiza o objeto com os novos dados
      reviews.namePerson = data.nome;
      reviews.email = data.email;
      reviews.phone = data.telefone;

      // Salva de volta no localStorage
      localStorage.setItem('JSON enviado', JSON.stringify(reviews));
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  }

  const onSubmit = (data) => {
    saveToLocalStorage(data);
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
            <div className="flex">
              <div className=" w-16 h-16 rounded-full  bg-gray-50  items-center justify-center"></div>
              <div>
                <p>{items.nomeCliente}</p>
                <p>pessoa fisica</p>
                <p>000.000.000-00</p>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <p>Dados da conta</p>
                <InputLabel>Nome</InputLabel>
                <InputRoot>
                  <InputField placeholder={items.nomeCliente} {...register("nome")}   
                  disabled={!isEditing} defaultValue={items.nomeCliente} />
                </InputRoot>
                <InputLabel>Email</InputLabel>
                <InputRoot>
                  <InputField placeholder={items.email} defaultValue={items.email} 
                  disabled={!isEditing} {...register("email")}/>
                </InputRoot>
                <InputLabel>Telefone</InputLabel>
                <InputRoot>
                  <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        placeholder={items.telefone}
                        {...field}
                        onChange={(e) => {
                          field.onChange(maskInput(e.target.value));
                        }}
                        disabled={!isEditing}
                      />
                      )}
                  />

                </InputRoot>
                <Button   type={isEditing ? "submit" : "button"} onClick={!isEditing ? toggleEdit : onSubmit}>
                  <ButtonText className="text-center">
                    {isEditing ? "Salvar" : "Editar"}
                  </ButtonText>
                </Button>
              </form>
            </div>
            {/*<div>
              <p>Senha</p>
              <InputLabel>Senha atual</InputLabel>
              <InputRoot>
                <InputField  disabled={!isPassword}/>
              </InputRoot>
              <InputLabel>Nova senha</InputLabel>
              <InputRoot>
                <InputField disabled={!isPassword}/>
              </InputRoot>
              <InputLabel>Confirmar senha</InputLabel>
              <InputRoot>
                <InputField  disabled={!isPassword}/>
              </InputRoot>
              <Button  onClick={togglePassword}>
                <ButtonText className="text-center">
                  {isPassword ? "Salvar" : "Alterar senha"}
                </ButtonText>
              </Button>
            </div>*/}

      </SectionApp>
    </>
  );
}

const schema = z.object({
  email: z
    .string()
    .email("Email inválido"),

  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 10 || val.length === 11, { message: "Telefone inválido" }),

  /*password: z
    .string()
    .nonempty("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres")
    .refine((val) => /[A-Z]/.test(val), { message: "Deve conter ao menos 1 letra maiúscula" })
    .refine((val) => /[0-9]/.test(val), { message: "Deve conter ao menos 1 número" })
    .refine((val) => /[@#$?]/.test(val), { message: "Deve conter ao menos 1 caractere especial (@, #, $, ?)" }),
  confirmPassword: z.string().nonempty("Campo obrigatório"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],*/
});


function maskInput(value) {
  const onlyDigits = value.replace(/\D/g, '');

 
    if (onlyDigits.length > 10) {
      return onlyDigits
        .replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4')
        .replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2 $3-$4');
    }
    // Fixo: (99) 9999-9999 (10 dígitos)
    return onlyDigits
      .replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3')
      .replace(/^(\d{2})(\d{0,4})(\d{0,4})/, (match, ddd, first, last) => {
        if (!first) return ddd ? `(${ddd}` : '';
        if (!last) return `(${ddd}) ${first}`;
        return `(${ddd}) ${first}-${last}`;
      });
  

}