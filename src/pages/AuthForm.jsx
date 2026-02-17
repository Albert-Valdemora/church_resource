import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import supabase from "../supabase-client"
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setErrorMsg("")
    setSuccessMsg("")
  }

  const switchMode = (login) => {
    setIsLogin(login)
    resetForm()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")
    setLoading(true)

    try {
      const {  error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      navigate("/")


    } catch (error) {
      setErrorMsg(error.message || "Error al iniciar sesion")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")

    if (password !== confirmPassword) {
      setErrorMsg("Las contrasenas no coinciden")
      return
    }

    if (password.length < 6) {
      setErrorMsg("La contrasena debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
     
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error

      setSuccessMsg("Registro exitoso. Revisa tu correo para confirmar tu cuenta.")
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      setErrorMsg(error.message || "Error al registrar usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-background p-4">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            {isLogin ? "Iniciar Sesion" : "Crear Cuenta"}
          </h2>
          <p className="font-medium text-base text-muted-foreground mt-2">
            {isLogin
              ? "Ingresa tus credenciales para acceder"
              : "Registrate con tu correo y contrasena"}
          </p>
        </div>

        <div className="flex w-full rounded-lg bg-muted p-1 mb-6">
          <button
            type="button"
            onClick={() => switchMode(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              isLogin
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Iniciar Sesion
          </button>
          <button
            type="button"
            onClick={() => switchMode(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              !isLogin
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Registrarse
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive-foreground font-medium">{errorMsg}</p>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-sm text-emerald-600 font-medium">{successMsg}</p>
          </div>
        )}

        <form
          className="border border-border rounded-lg p-6 flex flex-col gap-5 bg-card"
          onSubmit={isLogin ? handleLogin : handleSignUp}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="font-semibold text-foreground">
              Correo electronico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                className="pl-10"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="font-semibold text-foreground">
              Contrasena
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Tu contrasena"
                className="pl-10 pr-10"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword" className="font-semibold text-foreground">
                Confirmar contrasena
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repite tu contrasena"
                  className="pl-10 pr-10"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirmPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          <Button className="w-full mt-2" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isLogin ? "Ingresando..." : "Registrando..."}
              </>
            ) : isLogin ? (
              "Iniciar Sesion"
            ) : (
              "Crear Cuenta"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isLogin ? "No tienes cuenta? " : "Ya tienes cuenta? "}
          <button
            type="button"
            onClick={() => switchMode(!isLogin)}
            className="text-foreground font-semibold hover:underline underline-offset-2"
          >
            {isLogin ? "Registrate aqui" : "Inicia sesion"}
          </button>
        </p>
      </div>
    </div>
  )
}
