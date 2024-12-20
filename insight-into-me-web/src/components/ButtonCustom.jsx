import { Button } from "@chakra-ui/react";

const ButtonCustom = ({text, type, onClick}) => {
    return <>
    {type === "PRIMARY" && <Button 
        bg="brand.100"
        variant="solid"
        size="sm"
        onClick={onClick} >
        {text}
    </Button>}

    {type === "CANCEL" && <Button 
        colorScheme="gray"
        variant="solid"
        size="sm"
        onClick={onClick} >
        {text}
    </Button>}
    </> 
};

export default ButtonCustom;