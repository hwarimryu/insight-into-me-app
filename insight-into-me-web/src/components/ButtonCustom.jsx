// import "./Button.css"
import { Button } from "@chakra-ui/react";


const ButtonCustom = ({text, type, onClick}) => {
    return <Button 
        colorScheme="teal"
        variant="solid"
        size="sm"
        onClick={onClick} >
        {text}
    </Button>
};

export default ButtonCustom;