const AlertDialogLogout = () => {
    return (
        <div className="w-[400px] p-6 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="justify-center text-slate-900 text-lg font-semibold font-['Archivo'] leading-7">Logout</div>
                <div className="self-stretch justify-center text-slate-500 text-sm font-normal font-['Archivo'] leading-tight">Are you sure want to logout?</div>
            </div>
            <div className="self-stretch inline-flex justify-end items-center gap-2">
                <div data-show-left-icon="false" data-show-right-icon="false" data-size="default" data-state="default" data-variant="outline" className="h-10 px-4 py-2 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-1.5">
                    <div className="text-center justify-center text-slate-900 text-sm font-medium font-['Archivo'] leading-tight">Cancel</div>
                </div>
                <div data-show-left-icon="false" data-show-right-icon="false" data-size="default" data-state="default" data-variant="default" className="h-10 px-4 py-2 bg-blue-600 rounded-md flex justify-center items-center gap-1.5">
                    <div className="text-center justify-center text-slate-50 text-sm font-medium font-['Archivo'] leading-tight">Logout</div>
                </div>
            </div>
        </div>
    );
}

export default AlertDialogLogout;