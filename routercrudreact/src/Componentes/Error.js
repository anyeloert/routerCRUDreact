import React from 'react';

const Error = ({mensaje}) => (
    <div className="alert alert-danger text-center mt-3">
        <strong> {mensaje}</strong>
    </div>
    );

export default Error;