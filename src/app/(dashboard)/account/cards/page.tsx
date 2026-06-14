"use client";
import React, { useState } from "react";
import { Plus, Trash2, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentCard {
  id: string;
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  type: "visa" | "mastercard";
  bgGradient: string;
}

const defaultCards: PaymentCard[] = [
  {
    id: "1",
    cardholderName: "SM Tanimur Mushfiq",
    cardNumber: "**** **** **** 4892",
    expiry: "12/28",
    cvv: "321",
    type: "visa",
    bgGradient: "from-blue-600 to-indigo-900",
  },
  {
    id: "2",
    cardholderName: "SM Tanimur Mushfiq",
    cardNumber: "**** **** **** 8301",
    expiry: "08/29",
    cvv: "148",
    type: "mastercard",
    bgGradient: "from-slate-800 to-slate-950",
  },
];

export default function MyCardsPage() {
  const [cards, setCards] = useState<PaymentCard[]>(defaultCards);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState<"visa" | "mastercard">("visa");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    // Format as **** **** **** ****
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || number.length < 19 || expiry.length < 5 || cvv.length < 3) {
      return;
    }

    const gradients = [
      "from-rose-600 to-rose-950",
      "from-emerald-700 to-teal-950",
      "from-amber-600 to-amber-950",
      "from-indigo-600 to-purple-950",
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newCard: PaymentCard = {
      id: Date.now().toString(),
      cardholderName: name,
      cardNumber: `**** **** **** ${number.slice(-4)}`,
      expiry,
      cvv,
      type: cardType,
      bgGradient: randomGradient,
    };

    setCards([...cards, newCard]);
    // Reset Form
    setName("");
    setNumber("");
    setExpiry("");
    setCvv("");
    setShowAddForm(false);
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 md:p-8 rounded-2xl min-h-[calc(83vh-3.5rem)] border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100">Saved Cards</h2>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 mt-0.5">Manage your saved credit and debit cards.</p>
        </div>
        {!showAddForm && (
          <Button 
            onClick={() => setShowAddForm(true)} 
            className="flex items-center gap-1.5 rounded-xl font-bold transition duration-300 py-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Card</span>
          </Button>
        )}
      </div>

      <div className="mt-8">
        {showAddForm ? (
          <div className="flex flex-col lg:flex-row gap-8 items-start max-w-4xl">
            {/* Live Card Preview */}
            <div className="w-full md:w-[320px] shrink-0 mx-auto lg:mx-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 text-center lg:text-left">Preview</h3>
              
              <div className={`relative w-full h-[180px] rounded-2xl bg-gradient-to-br ${cardType === 'visa' ? 'from-blue-600 to-indigo-900' : 'from-slate-800 to-slate-950'} p-6 text-white shadow-xl overflow-hidden transition-all duration-300`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* Chip & Type */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-8 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-md relative shadow-inner flex items-center justify-center border border-yellow-200/50">
                    <div className="w-6 h-5 border border-yellow-700/20 rounded-sm" />
                  </div>
                  {cardType === 'visa' ? (
                    <span className="text-2xl font-black italic tracking-widest text-white/90">VISA</span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full bg-rose-500/90" />
                      <div className="w-6 h-6 rounded-full bg-amber-500/90 -ml-3.5" />
                    </div>
                  )}
                </div>

                {/* Card Number */}
                <div className="mt-6">
                  <p className="text-lg font-mono tracking-widest text-white/95">
                    {number || "•••• •••• •••• ••••"}
                  </p>
                </div>

                {/* Card Holder & Expiry */}
                <div className="mt-5 flex justify-between items-end">
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block">Card Holder</span>
                    <p className="text-xs font-semibold tracking-wide uppercase truncate">
                      {name || "YOUR NAME HERE"}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block">Expires</span>
                    <p className="text-xs font-semibold tracking-wide font-mono">
                      {expiry || "MM/YY"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 w-full space-y-4 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl bg-slate-50/30 dark:bg-slate-900/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="card-name" className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Cardholder Name</Label>
                  <Input 
                    id="card-name" 
                    placeholder="e.g. SM Tanimur Mushfiq" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1.5 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-primary h-10"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="card-number" className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Card Number</Label>
                  <Input 
                    id="card-number" 
                    placeholder="xxxx xxxx xxxx xxxx" 
                    value={number}
                    onChange={handleCardNumberChange}
                    required
                    className="mt-1.5 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-primary h-10 font-mono"
                  />
                </div>

                <div>
                  <Label htmlFor="card-expiry" className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Expiry Date</Label>
                  <Input 
                    id="card-expiry" 
                    placeholder="MM/YY" 
                    value={expiry}
                    onChange={handleExpiryChange}
                    required
                    className="mt-1.5 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-primary h-10 font-mono"
                  />
                </div>

                <div>
                  <Label htmlFor="card-cvv" className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">CVV</Label>
                  <Input 
                    id="card-cvv" 
                    placeholder="xxx" 
                    type="password"
                    value={cvv}
                    onChange={handleCvvChange}
                    required
                    className="mt-1.5 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-primary h-10 font-mono"
                  />
                </div>

                <div className="col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Card Network</Label>
                  <div className="flex gap-4 mt-2">
                    <label className={`flex-1 border p-3 rounded-xl flex items-center justify-between cursor-pointer transition ${cardType === 'visa' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                      <input type="radio" name="cardType" checked={cardType === 'visa'} onChange={() => setCardType('visa')} className="sr-only" />
                      <span className="text-sm font-semibold">Visa</span>
                      <span className="text-xs italic tracking-widest font-black">VISA</span>
                    </label>
                    <label className={`flex-1 border p-3 rounded-xl flex items-center justify-between cursor-pointer transition ${cardType === 'mastercard' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                      <input type="radio" name="cardType" checked={cardType === 'mastercard'} onChange={() => setCardType('mastercard')} className="sr-only" />
                      <span className="text-sm font-semibold">Mastercard</span>
                      <div className="flex items-center gap-0.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-rose-500" />
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-500 -ml-2" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="rounded-xl font-bold flex-1 h-10">Save Card</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="rounded-xl font-bold h-10">Cancel</Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div 
                key={card.id}
                className={`relative w-full h-[180px] rounded-2xl bg-gradient-to-br ${card.bgGradient} p-6 text-white shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* Chip & Type */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-8 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-md relative shadow-inner flex items-center justify-center border border-yellow-200/50">
                    <div className="w-6 h-5 border border-yellow-700/20 rounded-sm" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => deleteCard(card.id)}
                      className="opacity-0 group-hover:opacity-100 hover:bg-white/20 p-1.5 rounded-lg transition-opacity duration-300"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                    {card.type === 'visa' ? (
                      <span className="text-2xl font-black italic tracking-widest text-white/90">VISA</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-rose-500/90" />
                        <div className="w-6 h-6 rounded-full bg-amber-500/90 -ml-3.5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Number */}
                <div className="mt-6">
                  <p className="text-lg font-mono tracking-widest text-white/95">
                    {card.cardNumber}
                  </p>
                </div>

                {/* Card Holder & Expiry */}
                <div className="mt-5 flex justify-between items-end">
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block font-medium">Card Holder</span>
                    <p className="text-xs font-semibold tracking-wide uppercase truncate">
                      {card.cardholderName}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block font-medium">Expires</span>
                    <p className="text-xs font-semibold tracking-wide font-mono">
                      {card.expiry}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty Add Card visual box */}
            <div 
              onClick={() => setShowAddForm(true)}
              className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl w-full h-[180px] flex flex-col justify-center items-center gap-3 hover:border-primary/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:scale-110 transition duration-300">
                <CreditCard className="w-6 h-6 text-slate-400 group-hover:text-primary transition" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Add New Card</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Secure payment methods</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-slate-400 dark:text-slate-500">
        <Shield className="w-4 h-4 text-emerald-500" />
        <span className="text-xs font-semibold">Your card information is stored securely and fully encrypted.</span>
      </div>
    </div>
  );
}