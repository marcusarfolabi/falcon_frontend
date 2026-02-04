"use client";

import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { User, Mail, HardDrive, Camera, Globe, Plus, Trash2, X, Check } from "lucide-react";

export default function AccountSettings() {
  const [name, setName] = useState("David Falcon");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock Data - In a real app, these come from Stalwart JMAP Identity/get
  const [aliases, setAliases] = useState([
    { id: "1", email: "work@falconmail.com", label: "Work", isPrimary: true },
    { id: "2", email: "hello@david.com", label: "Personal", isPrimary: false },
  ]);

  const removeAlias = (id: string) => setAliases(aliases.filter(a => a.id !== id));

  return (
    <div className="p-4 sm:p-6 lg:p-12 max-w-4xl animate-in fade-in slide-in-from-right-4 duration-500 pb-32">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Account</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your Stalwart JMAP identities.</p>
      </header>

      {/* Profile Section */}
      <section className="bg-slate-50 rounded-[2.5rem] p-6 mb-8 border border-slate-100 flex flex-col items-center sm:flex-row sm:items-start gap-6 transition-all">
        <div className="relative group shrink-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
               <User size={40} className="text-slate-200" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full shadow-lg border-4 border-slate-50">
            <Camera size={14} />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input 
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    className="text-xl font-black text-slate-900 bg-white border border-blue-200 rounded-lg px-2 py-1 outline-none ring-4 ring-blue-50"
                  />
                  <button onClick={() => setIsEditingName(false)} className="p-2 bg-blue-600 text-white rounded-lg shadow-sm">
                    <Check size={16} />
                  </button>
                </div>
              ) : (
                <h2 
                  onClick={() => setIsEditingName(true)}
                  className="text-xl font-black text-slate-900 tracking-tight cursor-pointer hover:text-blue-600 transition-colors underline decoration-dotted decoration-slate-300"
                >
                  {name}
                </h2>
              )}
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Stalwart Identity</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Status</span>
                <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                </span>
             </div>
             <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Region</span>
                <span className="text-sm font-bold text-slate-700">East Africa</span>
             </div>
          </div>
        </div>
      </section>

      {/* Aliases Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Aliases</h3>
        </div>
        
        {aliases.map((alias) => (
          <div key={alias.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-3xl shadow-sm group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-800 tracking-tight">{alias.email}</span>
                  {alias.isPrimary && <span className="text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-black uppercase">Primary</span>}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{alias.label}</span>
              </div>
            </div>
            {!alias.isPrimary && (
              <button 
                onClick={() => removeAlias(alias.id)}
                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-sm font-bold hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-2 active:bg-blue-50"
        >
          <Plus size={18} strokeWidth={3} />
          Add New Alias
        </button>
      </div>

      {/* Add Alias Modal */}
      <AddAliasModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function AddAliasModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-left align-middle shadow-2xl transition-all border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title as="h3" className="text-xl font-black text-slate-900 tracking-tight">
                    New Alias
                  </Dialog.Title>
                  <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Alias Email</label>
                    <input 
                      placeholder="e.g. hello@domain.com"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Label</label>
                    <input 
                      placeholder="e.g. Personal"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all"
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button onClick={onClose} className="flex-1 py-4 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-colors">Cancel</button>
                  <button className="flex-1 py-4 text-sm font-bold bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                    Create Identity
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}