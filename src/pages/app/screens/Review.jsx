import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, SectionApp, Shape, AppHeader,ModalSm } from "@/components";
import { Eye, EyeSlash, UserList, LockSimpleOpen, CheckCircle, Star } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionBox } from "@/components";
import { CloudinaryImage } from "@/components/CloudinaryImage.jsx";
import { cpf, cnpj } from 'cpf-cnpj-validator';


export function Review() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, touchedFields, dirtyFields }
  } = useForm({
    mode: "onBlur"
  });
  const [submittedData, setSubmittedData] = useState(null);

  const [isModalSmOpen, setIsModalSmOpen] = useState(false);

  

  const handleCloseModalSm = () => {
    setIsModalSmOpen(false);
  }

  const onSubmit = (values) => {
    console.log("Dados do formulario",values);
    reset();
    setIsModalSmOpen(true)
  };

  const rating = watch('rating', 0);

  

  
  return (
    <>
      <SectionApp>
        <AppHeader screenTitle="Avaliar" />
        <CloudinaryImage publicId="vfq6dw8u2de9vcybxvka" className="w-64 justify-self-center"/>
        <div className="md:px-6" >
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className=" shadow-md p-4 rounded-lg ">
              <div className="flex gap-2">
                <div className="w-16 h-16 rounded-full  bg-gray-50 flex items-center justify-center">
                  <Image src="" alt="Imagem do cliente"  className="w-full h-full object-cover "/>
                </div>
                <div>
                  <FormField
                    register={register}
                    name="star"
                    title="Nome do cliente"
                    dirty={dirtyFields?.star}
                    rating={rating}
                    setValue={setValue}
                  />
                </div>
              </div>
              
              
              <textarea className="w-full bg-gray-50 rounded-sm p-2 mt-4 resize-none  gap-1" placeholder="Digite sua avaliação aqui" rows={5} {...register("avaliacao",{required:true})}></textarea>
              
            </div>
            <div className="flex gap-1 mt-2">
            <Button className={"bg-gray-50"} type="button">
                <ButtonText className="text-center ">
                  Cancelar
                </ButtonText>
              </Button>
              <Button className={"bg-red-tx"} type="submit">
                <ButtonText className="text-center text-white">
                  Enviar
                </ButtonText>
              </Button>
            </div>
          </form>
          <ModalView open={isModalSmOpen} onClose={handleCloseModalSm}/>

        </div>
      </SectionApp>
    </>
  );
}



function ModalView({open, onClose}){
  if (!open) return null;
  
  return(
    <ModalSm open={open} onClose={onClose}>
      <div className="justify-self-center text-center">
        <CheckCircle size={130} weight="fill" className="text-success-base mx-auto "/>
        <h2 className="font-bold ">Avaliação registrada com sucesso!</h2>
        <p className="pb-4 grid col-span-2 pt-4 mb-4">A TeruelExpress agradece pelo seu feedback.</p>
        <div >
          <Button onClick={onClose} className="border border-black w-30 mx-auto ">
            <ButtonText className="text-center font-bold">Fechar</ButtonText>
          </Button>
        </div>
      </div>
    </ModalSm>
    
  )
}

function FormField({ title,  error, dirty, rating, register,setValue, autoComplete = "off" }) {
  let status;
  if (dirty) {
    status = error ? "error" : "default"
  }

  
  return (
    <>
      <InputLabel className="text-base">{title}</InputLabel>
      <div className="flex gap-1">
        {[1,2,3,4,5].map((star) => (<Star weight="fill" key={star} size={32}  onClick={() => setValue('rating', star)} 
        className={`cursor-pointer transition ${star <= rating ? ' text-star ': ' text-gray-100' }`}/>))}
      </div>
      <InputRoot  status={status} className="hidden border-0">
        <InputField  
          autoComplete={autoComplete}
          type= "hidden" {...register('rating',{required:true})} 
        />
        
      </InputRoot>
      
    </>
  )
}