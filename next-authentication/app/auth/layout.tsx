const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-indigo-400 to-cyan-400">
      {children}
    </div>
  )
}

export default Layout
