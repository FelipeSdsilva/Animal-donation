import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

interface GenericDialogProps {
    open: boolean;
    title: string;
    onClose: () => void;
    onConfirm?: () => void; 
    content: React.ReactNode; 
}

const GenericDialog: React.FC<GenericDialogProps> = ({
    open,
    title,
    onClose,
    onConfirm,
    content,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                {onConfirm && (
                    <Button onClick={onConfirm} color="primary">
                        Confirmar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default GenericDialog;
