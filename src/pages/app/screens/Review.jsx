import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, SectionApp, Shape } from "@/components";
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

  const onSubmit = (values) => {
    console.log(values);
    reset();
  };

  const rating = watch('rating', 0);

  return (
    <>
      <SectionApp>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div>
              <FormField
                register={register}
                name="star"
                title="nome do cliente"
                dirty={dirtyFields?.star}
                rating={rating}
                setValue={setValue}
              />
            </div>
          </form>
          <InputRoot>
            <InputField placeholder="Digite sua avaliação"/>
          </InputRoot>
        </div>
      </SectionApp>
    </>
  );
}

function FormField({ title,  error, dirty, rating, register,setValue, autoComplete = "off" }) {
  let status;
  if (dirty) {
    status = error ? "error" : "default"
  }

  
  return (
    <>
      <InputLabel>{title}</InputLabel>
      <div className="flex gap-1">
        {[1,2,3,4,5].map((star) => (<Star key={star} size={32} onClick={() => setValue('rating', star)} 
        className={`cursor-pointer transition ${star <= rating ? ' text-yellow-50 ': ' text-gray-100' }`}/>))}
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