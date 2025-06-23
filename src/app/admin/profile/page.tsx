import React from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/layouts/AdminLayout';

const UserProfile = () => {
  return (
    <AdminLayout title="User Profile">
      <div className="p-4 lg:px-6 lg:pt-6">
        <div className="w-full flex-1 bg-gray-50 border-b border-slate-200 flex justify-center items-start">
          <div className="w-[400px] px-4 py-6 bg-white rounded-xl flex flex-col justify-center items-center gap-9">
            <div className="self-stretch text-center text-slate-900 text-xl font-semibold leading-7">
              User Profile
            </div>

            <div className="self-stretch flex flex-col justify-start items-center gap-6">
              {/* Profile Avatar */}
              <div className="w-[68px] h-[68px] bg-blue-200 rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-blue-900 text-2xl font-medium">J</span>
              </div>

              {/* Profile Fields */}
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <div className="self-stretch px-3 py-2.5 bg-gray-100 rounded-md border border-slate-200 flex justify-between items-center">
                  <div className="flex justify-start items-center gap-4">
                    <div className="flex justify-start items-center gap-2">
                      <div className="text-gray-900 text-base font-semibold">
                        Username
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <div className="text-gray-900 text-base font-normal">
                        :
                      </div>
                    </div>
                  </div>
                  <div className="w-[210px] text-center text-slate-900 text-base font-normal">
                    James Dean
                  </div>
                </div>

                <div className="self-stretch px-3 py-2.5 bg-gray-100 rounded-md border border-slate-200 flex justify-between items-center">
                  <div className="flex justify-start items-center gap-4">
                    <div className="w-[75px] flex justify-start items-center gap-2">
                      <div className="text-gray-900 text-base font-semibold">
                        Password
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <div className="text-gray-900 text-base font-normal">
                        :
                      </div>
                    </div>
                  </div>
                  <div className="w-[210px] text-center text-slate-900 text-base font-normal">
                    Admin123
                  </div>
                </div>

                <div className="self-stretch px-3 py-2.5 bg-gray-100 rounded-md border border-slate-200 flex justify-between items-center">
                  <div className="flex justify-start items-center gap-4">
                    <div className="w-[75px] flex justify-start items-center gap-2">
                      <div className="text-gray-900 text-base font-semibold">
                        Role
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <div className="text-gray-900 text-base font-normal">
                        :
                      </div>
                    </div>
                  </div>
                  <div className="w-[210px] text-center text-slate-900 text-base font-normal">
                    Admin
                  </div>
                </div>
              </div>
            </div>

            <Button className="self-stretch h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-slate-50 text-sm font-medium">
              Back to dashboard
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserProfile;
