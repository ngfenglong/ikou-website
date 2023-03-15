const ComingSoonPage = () => {
  return (
    // <main className="relative isolate min-h-full">
    <main className="place-items-center text-center bg-slate-50">
      <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
        <h1 className="mb-16 text-3xl font-bold tracking-tight text-gray-700 sm:text-5xl">
          Under Construction
        </h1>
      </div>
      <img
        src="/images/background/coming-soon-2.jpg"
        alt="Coming Soon"
        className="inset-0 -z-10 w-64 h-64 mx-auto object-cover object-top"
      />
      <div className="mt-10 flex justify-center">
        <a href="/#" className="text-sm font-semibold leading-7 text-gray-700">
          <span aria-hidden="true">&larr;</span> Back to home
        </a>
      </div>
    </main>
  );
};

export default ComingSoonPage;
