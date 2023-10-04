import axios from "axios";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Inputs {
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  subdistrict: string;
  postCode: string;
  citizen: string;
  phoneNumber: string;
  bank: string;
  bookBank: string;
  bookBankNumber: string;
  bookBankBranch: string;
  password: string;
  passwordCheck: string;
  sponsor: string;
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Confirmation = withReactContent(Swal);

export default function Register() {
  //for recaptcha validation
  const [isPerson, setIsPerson] = useState(false);

  //uxui
  const [isLoading, setIsLoading] = useState(false);
  //form
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    Confirmation.fire({
      html: <i>You clicked the button!</i>,
      icon: "success",
    });
    if (!isPerson) {
      return Swal.fire({
        title: "กรุณายืนยันตัวตน",
        icon: "info",
        heightAuto: false,
      });
    }
    Register(data);
  };
  //navigate
  const navigate = useNavigate();

  function Register(data: Inputs) {
    setIsLoading(true);
    axios
      .post("http://localhost:5050/register", {
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        setIsLoading(false);
        if (response.data) {
          navigate("/");
          Toast.fire({
            icon: "success",
            title: "ยินดีต้อนรับเข้าสู่ระบบ",
          });
        } else {
          Swal.fire({
            title: "รหัสผ่านผิดพลาด",
            icon: "error",
          });
        }
      })
      .catch(() => {
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
              {...register("username", { required: true })}
            />
            <label className="label">
              <span className="label-text text-xl">ชื่อจริง</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อจริง"
              className="input input-bordered bg-base-200 w-full max-w-xs"
              {...register("firstName", { required: true, maxLength: 50 })}
            />
            <label className="label">
              <span className="label-text text-xl">นามสกุล</span>
            </label>
            <input
              type="text"
              placeholder="นามสกุล"
              className="input input-bordered bg-base-200 w-full max-w-xs"
              {...register("lastName", { required: true, maxLength: 50 })}
            />
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text text-xl">ที่อยู่</span>
            </label>
            <textarea
              placeholder="ที่อยู่"
              className="input input-bordered bg-base-200 w-full max-w-xs"
              {...register("address", { required: true, maxLength: 50 })}
            />
            <label className="label">
              <span className="label-text text-xl">จังหวัด</span>
            </label>
            <select
              className="select select-bordered bg-base-200 w-full max-w-xs"
              {...register("city", { required: true })}
            >
              <option disabled selected>
                จังหวัด
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <label className="label">
              <span className="label-text text-xl">อำเภอ</span>
            </label>
            <select
              className="select select-bordered bg-base-200 w-full max-w-xs"
              {...register("district", { required: true })}
            >
              <option disabled selected>
                อำเภอ
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <label className="label">
              <span className="label-text text-xl">ตำบล</span>
            </label>
            <select
              className="select select-bordered bg-base-200 w-full max-w-xs"
              {...register("subdistrict", { required: true })}
            >
              <option disabled selected>
                ตำบล
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <label className="label">
              <span className="label-text text-xl">รหัสไปรษณีย์</span>
            </label>
            <select
              className="select select-bordered bg-base-200 w-full max-w-xs"
              {...register("postCode", { required: true })}
            >
              <option disabled selected>
                รหัสไปรษณีย์
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text text-xl">รหัสประชาชน</span>
            </label>
            <input
              type="text"
              placeholder="รหัสประชาชน"
              className="input input-bordered bg-base-200 w-full max-w-xs"
              {...register("citizen", {
                required: true,
                maxLength: 13,
                minLength: 13,
                pattern: /[0-9]{13}/,
              })}
            />
            <label className="label">
              <span className="label-text text-xl">เบอร์มือถือ</span>
            </label>
            <input
              type="text"
              placeholder="เบอร์มือถือ"
              className="input input-bordered bg-base-200 w-full max-w-xs"
              {...register("phoneNumber", {
                required: true,
                maxLength: 10,
                minLength: 10,
                pattern: /[0]{1}[2,6,8,9]{1}[0-9]{8}/,
              })}
            />
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text text-xl">ธนาคาร</span>
            </label>
            <select
              className="select select-bordered bg-base-200 w-full max-w-xs"
              {...register("bank", { required: true })}
            >
              <option disabled selected>
                ธนาคาร
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <label className="label">
              <span className="label-text text-xl">ชื่อเจ้าของบัญชีธนาคาร</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อเจ้าของบัญชีธนาคาร"
              className="input input-bordered bg-base-200 w-full max-w-xs"
              {...register("bookBank", { required: true })}
            />
            <label className="label">
              <span className="label-text text-xl">เลขบัญชีธนาคาร</span>
            </label>
            <input
              type="number"
              placeholder="เลขบัญชีธนาคาร"
              className="input input-bordered bg-base-200 w-full max-w-xs"
              {...register("bookBankNumber", { required: true, minLength: 8 })}
            />
            <label className="label">
              <span className="label-text text-xl">สาขาที่เปิดบัญชีธนาคาร</span>
            </label>
            <input
              type="text"
              placeholder="สาขาที่เปิดบัญชีธนาคาร"
              className="input input-bordered bg-base-200 w-full max-w-xs"
              {...register("bookBankBranch", { required: true })}
            />
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text text-xl">รหัสผ่าน</span>
            </label>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              className="input input-borderedv bg-base-200 w-full max-w-xs"
              {...register("password", { required: true })}
              autoComplete="false"
            />
            <input
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              className="input input-borderedv bg-base-200 w-full max-w-xs mt-4"
              {...register("passwordCheck", {
                required: true,
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              autoComplete="false"
            />
          </div>
          <button
            className="btn btn-accent btn-lg btn-wide my-6"
            type="submit"
            value="Submit"
            disabled={isLoading}
            onClick={() => {
              Confirmation.fire({
                title: "Confirmation",
                html: (
                  <>
                    <p>username</p>
                    <ReCAPTCHA
                      sitekey="6LftBNcmAAAAAF0Pb7ncvfbjkuR-pTyX8ojCRH0M"
                      onChange={() => setIsPerson(true)}
                    />
                  </>
                ),
                icon: "question",
              });
            }}
          >
            สมัครสมาชิก
          </button>
        </form>

        <div className="flex mt-5">
          <p className="mr-2">มีบัญชีผู้ใช้อยู่แล้ว?</p>
          <Link to={"/login"}>
            <p className="text-blue-500 underline underline-offset-auto">
              ล๊อกอิน!
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
