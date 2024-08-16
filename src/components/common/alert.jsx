import React from "react";
import Swal from "sweetalert2";
import {Messages} from "../../utils/messages.js";
import {useNavigate} from "react-router-dom";


export const showAlertSuccessSimple = (title, text, navigate, path) => {
    Swal.fire({
        title: title,
        text: text,
        icon: Messages.GENERIC_SUCCESS_ICON,
        confirmButtonColor: Messages.GENERIC_COLOR_SUCCESS
    }).then(() => {
        if (navigate && path) {
            navigate(path);
        }
    });
};

export const showAlertErrorSimple = ({title = Messages.GENERIC_ERROR_TITLE, text}) => {
    Swal.fire({
        title: title,
        html: text,
        icon: Messages.GENERIC_ERROR_ICON,
        confirmButtonColor: Messages.GENERIC_COLOR_ERROR
    });
};

