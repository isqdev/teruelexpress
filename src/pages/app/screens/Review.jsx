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
  const avaliacao = watch("avaliacao", "");
  const rating = watch('rating', 0);
  const [clickedSuggestions,setClickedSuggestions] = useState([]);

  const handleCloseModalSm = () => {
    setIsModalSmOpen(false);
  }

  const onSubmit = (values) => {
    const newReview = {...values, timestamp: new Date().toISOString};
    setClickedSuggestions(prev => [...prev, newReview]);
    const existingReviews=localStorage.getItem("jsonReview");
    let allReviews= [];
    if (existingReviews){
      const parsedReviews = JSON.parse(existingReviews);
      if(Array.isArray(parsedReviews)){
        allReviews = parsedReviews;
      } else{
        allReviews = [];
      }
    }
    allReviews.push(newReview);    
    const updateReviews = JSON.stringify(allReviews);
    localStorage.setItem("jsonReview", updateReviews);
    reset();
    setIsModalSmOpen(true)
  };
  

  
  

  
  return (
    <>
      <SectionApp>
        <AppHeader screenTitle="Avaliar" />
        <div className="max-w-sm sm:max-w-lg mx-auto mt-30" >
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className=" shadow-md p-4 rounded-2xl ">
              <div className="flex gap-2">
                <div className="w-16 h-16 rounded-full  bg-gray-50 flex items-center justify-center">
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
              <div className="relative">
                <textarea
                  className="w-full bg-gray-50 rounded-2xl p-2 mt-4 resize-none gap-1 outline-blue-500"
                  maxLength={300}
                  placeholder="Digite sua avaliação aqui"
                  rows={6}
                  {...register("avaliacao")}
                ></textarea>
                <span className="absolute bottom-2 right-2 text-sm  text-gray-600 text-gray-500">
                  {avaliacao.length}/300
                </span>
              </div>
              
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 sm:gap-4 sm:mt-4">
              <Link to="/app/home">
                <Button className={"bg-gray-50"} type="button" onClick={() => reset()}>
                  <ButtonText className="text-center ">
                    Cancelar
                  </ButtonText>
                </Button>
              </Link>
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
        <h4 className="font-bold ">Avaliação registrada com sucesso!</h4>
        <p className="pb-4 grid col-span-2 pt-4 mb-4">A TeruelExpress agradece pelo seu feedback.</p>
        <div >
          <Link to="/app/home">
            <Button onClick={onClose} className="border border-black w-30 mx-auto ">
              <ButtonText className="text-center font-bold">Fechar</ButtonText>
            </Button>
          </Link>
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

