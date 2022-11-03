/* eslint-disable no-nested-ternary */
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

export const CustomInput = styled(InputBase)(({ theme, startAdornment, endAdornment }) => ({
    'label + &': {
        marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '100%',
        padding: '10px 0px',
        paddingLeft: startAdornment ? '40px' : '10px',
        paddingRight: endAdornment ? '40px' : '10px',
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow'])
    }
}));

export const CustomTextField = styled(TextField)(({ theme, variant, error, InputProps }) => ({
    '& legend, label': {
        display: variant === 'outlined' ? 'outlined' : 'block'
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        '& fieldset': {
            border: error ? '1px solid #d32f2f' : '1px solid #ced4da'
        }
    },
    '& fieldset': {
        top: 0
    },
    '& .MuiInputBase-input': {
        width: '100%',
        paddingLeft: InputProps?.startAdornment ? '40px' : variant === 'outlined' ? '10px' : '0px',
        paddingRight: InputProps?.endAdornment ? '40px' : variant === 'outlined' ? '10px' : '0px',
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow'])
    },
    '& .MuiOutlinedInput-root': {
        paddingLeft: 0
    }
}));

export const CustomSelect = styled(Select)({
    '& legend, label': {
        display: 'none'
    },
    '& .MuiOutlinedInput-root .Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ced4da !important'
        }
    },
    '& fieldset': {
        top: 0
    }
});

export const customInputLabelStyle = {
    fontSize: '1.2rem',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif !important'
};

export const customDialogLabelStyle = {
    ...customInputLabelStyle,
    marginBottom: '-10px'
};

export const customMultiSelectInputStyle = {
    '& .MuiInputBase-sizeSmall': {
        padding: '4.5px 6px !important',
        paddingRight: '65px !important',
        '& .MuiAutocomplete-input': {
            padding: '4px 4px 4px 6px !important'
        }
    },
    '& .MuiChip-root': {
        height: '25px',
        '& .MuiChip-deleteIcon': { fontSize: '18px' }
    }
};

export const customInputRightIconStyle = { position: 'absolute', right: '10px', zIndex: 1 };
export const customInputLeftIconStyle = { position: 'absolute', left: '10px', zIndex: 1 };
