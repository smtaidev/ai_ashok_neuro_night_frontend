import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MainNavbar from '@/components/shared/Navbar'
import EmployeeAuthForm from '@/features/auth/components/employee-auth-form'

export default function page() {
  return (
    <div className=''>
      <div className="bg-white/96 sticky top-0 z-10 py-4">
        <MainNavbar />
      </div>
      {/* min-h-screen */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-semibold text-[#231F20]">Organization Employee Login</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <EmployeeAuthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
