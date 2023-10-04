import axios from "axios";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Inputs {
  username: string;
  password: string;
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

export default function Login() {
  //for recaptcha validation
  const [isPerson, setIsPerson] = useState(false);
  //uxui
  const [isLoading, setIsLoading] = useState(false);
  //form
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!isPerson) {
      return Swal.fire({
        title: "กรุณายืนยันตัวตน",
        icon: "info",
        heightAuto: false,
      });
    }
    Login(data);
  };
  //navigate
  const navigate = useNavigate();

  function Login(data: Inputs) {
    setIsLoading(true);
    axios
      .post("http://localhost:5050/login", {
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        setIsLoading(false);
        if (response.data) {
          navigate("/");
          Toast.fire({
            icon: 'success',
            title: 'ยินดีต้อนรับเข้าสู่ระบบ'
          })
        } else {
          Swal.fire({
            title: "รหัสผ่านผิดพลาด",
            icon: "error",
          });
        }
      })
      .catch(()=> {
        setIsLoading(false);
        Swal.fire({
          title: "การล็อกอินล้มเหลว",
          text: "กรุณาลองใหม่",
          icon: "error",
          heightAuto: false,
        });
      });
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <img src="/images/logo1.svg" className="h-80 ms-32" />
        <div className="prose">
          <h1>เข้าสู่ระบบ</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text text-xl">ชื่อผู้ใช้</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อผู้ใช้"
              className="input input-bordered bg-base-200 w-full max-w-xs"
              defaultValue="test"
              {...register("username", { required: true })}
            />
            <label className="label">
              <span className="label-text text-xl">รหัสผ่าน</span>
            </label>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              className="input input-borderedv bg-base-200 w-full max-w-xs"
              defaultValue="test"
              {...register("password", { required: true })}
              autoComplete="false"
            />
          </div>
          <button
            className="btn btn-accent btn-lg btn-wide my-6"
            type="submit"
            value="Submit"
            disabled={isLoading}
          >
            ล๊อกอิน
          </button>
        </form>

        <ReCAPTCHA
          sitekey="6LftBNcmAAAAAF0Pb7ncvfbjkuR-pTyX8ojCRH0M"
          onChange={() => setIsPerson(true)}
        />
        <div className="flex mt-5">
          <p className="mr-2">ยังไม่มีบัญชีผู้ใช้?</p>
          <Link to={"/register"}>
            <p className="text-blue-500 underline underline-offset-auto">
              สมัครสมาชิก!
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
