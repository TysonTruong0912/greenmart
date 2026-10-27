import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/stores/uiStore'

const schema = z.object({
  emailOrPhone: z.string().min(1, 'Vui lòng nhập email hoặc số điện thoại'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

type FormData = z.infer<typeof schema>

export function LoginPage() {
  const { addToast } = useUIStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    // Mock login - will connect to API later
    await new Promise((r) => setTimeout(r, 800))
    addToast('Đăng nhập thành công (demo)', 'success')
    console.log(data)
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-lg">
              G
            </div>
            <span className="text-2xl font-bold text-gray-900">GreenMart</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Đăng nhập</h1>
          <p className="mt-2 text-sm text-gray-500">Chào mừng bạn quay trở lại</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Email hoặc số điện thoại
            </label>
            <input
              id="emailOrPhone"
              type="text"
              className="input"
              placeholder="email@example.com hoặc 09xx..."
              {...register('emailOrPhone')}
            />
            {errors.emailOrPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.emailOrPhone.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <Link to="/quen-mat-khau" className="text-sm text-primary-600 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
            Đăng nhập
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/dang-ky" className="font-medium text-primary-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
