import { FormBoxHeaderRoot } from './FormBoxHeader.styles';

interface FormBoxHeaderProps {
   imageUrl: string;
   imageAlt: string;
   title: string;
   text: string;
}

const FormBoxHeader = ({
   imageUrl,
   imageAlt,
   title,
   text,
}: FormBoxHeaderProps) => {
   return (
      <FormBoxHeaderRoot>
         <img src={imageUrl} alt={imageAlt} />
         <h3>{title}</h3>
         <p>{text}</p>
      </FormBoxHeaderRoot>
   );
};

export default FormBoxHeader;
