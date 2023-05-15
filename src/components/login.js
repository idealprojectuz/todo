import './login.css';
import { useState , useRef, Fragment} from 'react';
function Login({setLogin }) {
    const [confirm, setConfirm] = useState(false)
    const [tgid, setTgid] = useState()
    const [code, setcode]=useState()
    const [birinchi, setBirinchi] = useState('')
    const [ikkinchi, setIkkinchi] = useState('')
    const [uchunchi, setUchunchi] = useState('')
    const [tortinchi, setTortinchi] = useState('')
        
    const birinchiRef = useRef(null)
    const uchunchiRef = useRef(null)
    const tortinchiRef = useRef(null)
    const submitbtn = useRef(null)
    const ikkinchiRef = useRef(null)
    const birinchiFunc = e => {
            let val = e.target.value
            setBirinchi(val)
            if (val.length === 1) {
                ikkinchiRef.current.focus();
            }
        }
    const ikkinchiFunc = e => {
            let val = e.target.value
            setIkkinchi(val)
            if (val.length === 1) {
                uchunchiRef.current.focus();
            }
        }
    const uchunchiFunc = e => {
            let val = e.target.value
            setUchunchi(val)
            if (val.length === 1) {
                tortinchiRef.current.focus();
            }
        }
    const tortinchiFunc = e => {
            let val = e.target.value
            setTortinchi(val)
            if (val.length === 1) {

                tortinchiRef.current.blur();
                submitbtn.current.focus();
            }
        }
    const settelegram = (e) => {
        setTgid((p) => p = e.target.value)
    }
    const sendsms = (e) => {
        if (tgid.length > 0 ) {
            let randomNum = Math.floor(Math.random() * 9000) + 1000;
            setcode((p)=>p=randomNum)
            let message=`${randomNum} Saytga kirishda ushbu koddan foydalanasiz`
            fetch(`${process.env.REACT_APP_BASE_URL}/sendMessage?chat_id=${tgid}&text=${encodeURIComponent(message)}`)
                .then(Response => Response.json)
                .then(res => {
                        setConfirm((p) => p = true)
                })
                .catch(Error => console.error(Error))
        }
        else {
            alert("Siz xato kod kiritdingiz")
        }
    }

    const submidisable = (e) => {
        e.preventDefault()
    }
    
    const tekshiruv = () => {
        let usecode = `${birinchi}${ikkinchi}${uchunchi}${tortinchi}`
        if (code == usecode) {
            setLogin((p)=>p=true)
        }
        else {
            alert('Kod xato')
         }
     }
    return (
        <>
            <div className="loginwrap">
                <div className="loginTitle">
                    <h2>Tizimga kirish</h2>
                    <p>Tizimga kirish uchun <a href='https://t.me/idealtodologinbot' rel="noreferrer"  target={'_blank'}> @idealtodologinbot </a> telegram botiga kirib start bosing va sizga kod beriladi uni quyidagi joyga kiriting</p>
                </div>
                <div className='tgforms'>
                    <form onSubmit={submidisable}>
                        <div className='telwrap'>
                            <input type="number" className='sendtg' defaultValue={tgid} onChange={settelegram} placeholder='Maxsuus kod' />
                            <button type='button' className='send' onClick={sendsms}>
                                <i className="fa-solid fa-paper-plane" />
                            </button>
                        </div>
                        { confirm ? <>
                        <div className="verify">
                            <input type="number" onChange={birinchiFunc} ref={birinchiRef} name="1"/>
                            <input type="number" onChange={ikkinchiFunc} ref={ikkinchiRef} name="2"/>
                            <input type="number" onChange={uchunchiFunc} ref={uchunchiRef} name="3"/>
                            <input type="number" onChange={tortinchiFunc} ref={tortinchiRef} name="4"/>
                        </div>
                            <button type='button' ref={submitbtn} onClick={tekshiruv} className='sendbtn mysubmitbtns'> Tekshirish </button>
                        </> : '' }
                        
                    </form>
                </div>
            </div>
        </>
    );
}
export default Login;