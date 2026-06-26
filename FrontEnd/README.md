<!-- import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Bell,
    User,
} from "lucide-react";

export default function Home() {
    const transactions = [
        {
            id: 1,
            title: "Salary",
            date: "26 Jun 2026",
            amount: "+$2,500",
            type: "income",
        },
        {
            id: 2,
            title: "Netflix",
            date: "25 Jun 2026",
            amount: "-$15",
            type: "expense",
        },
        {
            id: 3,
            title: "Shopping",
            date: "24 Jun 2026",
            amount: "-$220",
            type: "expense",
        },
        {
            id: 4,
            title: "Transfer",
            date: "23 Jun 2026",
            amount: "+$450",
            type: "income",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-700">OurBank</h1>

                <div className="flex items-center gap-6">
                    <Bell className="cursor-pointer" />
                    <div className="flex items-center gap-2">
                        <User className="bg-gray-200 rounded-full p-1" size={35} />
                        <span className="font-semibold">Md Omar Faruk Siam</span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-8">
                {/* Welcome */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">Welcome Back 👋</h2>
                    <p className="text-gray-500">
                        Here's your banking overview today.
                    </p>
                </div>

                {/* Balance Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-700 text-white rounded-2xl p-6 shadow">
                        <Wallet size={35} />
                        <p className="mt-4 text-sm">Total Balance</p>
                        <h2 className="text-4xl font-bold mt-2">$12,450.00</h2>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow">
                        <p className="text-gray-500">Savings</p>
                        <h2 className="text-3xl font-bold mt-2">$8,230</h2>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow">
                        <p className="text-gray-500">Checking</p>
                        <h2 className="text-3xl font-bold mt-2">$4,220</h2>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow mb-8">
                    <h3 className="text-xl font-bold mb-6">Quick Actions</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        <button className="bg-blue-600 text-white rounded-xl p-5 hover:bg-blue-700 transition flex flex-col items-center gap-3">
                            <ArrowUpRight size={30} />
                            Transfer
                        </button>

                        <button className="bg-green-600 text-white rounded-xl p-5 hover:bg-green-700 transition flex flex-col items-center gap-3">
                            <ArrowDownLeft size={30} />
                            Deposit
                        </button>

                        <button className="bg-red-500 text-white rounded-xl p-5 hover:bg-red-600 transition flex flex-col items-center gap-3">
                            <Wallet size={30} />
                            Withdraw
                        </button>

                        <button className="bg-yellow-500 text-white rounded-xl p-5 hover:bg-yellow-600 transition flex flex-col items-center gap-3">
                            <CreditCard size={30} />
                            Cards
                        </button>
                    </div>
                </div>

                {/* Transactions */}
                <div className="bg-white rounded-2xl shadow">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h3 className="text-xl font-bold">Recent Transactions</h3>

                        <button className="text-blue-600 font-semibold">
                            View All
                        </button>
                    </div>

                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-4">Description</th>
                                <th className="text-left px-6 py-4">Date</th>
                                <th className="text-right px-6 py-4">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-5 font-medium">
                                        {item.title}
                                    </td>

                                    <td className="px-6 py-5 text-gray-500">
                                        {item.date}
                                    </td>

                                    <td
                                        className={`px-6 py-5 text-right font-bold ${item.type === "income"
                                                ? "text-green-600"
                                                : "text-red-500"
                                            }`}
                                    >
                                        {item.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}









import {
    ShieldCheck,
    Wallet,
    CreditCard,
    Smartphone,
    TrendingUp,
    ArrowRight,
} from "lucide-react";

export default function Home() {
    return (
        <main>

            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 items-center gap-10">

                    <div>
                        <p className="uppercase tracking-widest text-blue-200 mb-3">
                            Modern Digital Banking
                        </p>

                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                            Banking made
                            <span className="text-yellow-400"> Simple</span>,
                            Secure &
                            Smart
                        </h1>

                        <p className="mt-6 text-lg text-blue-100 leading-8">
                            Manage your money, transfer instantly, pay bills, track expenses,
                            and invest—all from one secure banking platform.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <button className="bg-yellow-400 text-black px-7 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition">
                                Open Account
                            </button>

                            <button className="border border-white px-7 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
                            alt=""
                            className="rounded-3xl shadow-2xl"
                        />
                    </div>

                </div>
            </section>

            {/* Features */}

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold">
                            Why Choose Our Bank
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Everything you need for personal and business banking.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <Feature
                            icon={<ShieldCheck size={40} />}
                            title="Secure Banking"
                            text="Advanced encryption keeps your money protected."
                        />

                        <Feature
                            icon={<Wallet size={40} />}
                            title="Easy Payments"
                            text="Pay anyone instantly with zero hassle."
                        />

                        <Feature
                            icon={<CreditCard size={40} />}
                            title="Virtual Cards"
                            text="Generate secure digital cards in seconds."
                        />

                        <Feature
                            icon={<Smartphone size={40} />}
                            title="Mobile Banking"
                            text="Manage everything from your smartphone."
                        />

                    </div>
                </div>
            </section>

            {/* Statistics */}

            <section className="bg-blue-700 text-white py-20">

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">

                    <Stat number="2M+" label="Customers" />
                    <Stat number="$8B+" label="Transactions" />
                    <Stat number="99.9%" label="Uptime" />
                    <Stat number="150+" label="Countries" />

                </div>

            </section>

            {/* Services */}

            <section className="py-24">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <img
                            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
                            alt=""
                            className="rounded-3xl shadow-xl"
                        />

                        <div>

                            <h2 className="text-4xl font-bold">
                                Everything You Need
                            </h2>

                            <p className="mt-6 text-gray-600 leading-8">
                                Transfer funds, pay utility bills, request loans,
                                monitor investments, and control your finances from one
                                dashboard.
                            </p>

                            <div className="space-y-6 mt-8">

                                <Service title="Instant Money Transfer" />

                                <Service title="Loan Management" />

                                <Service title="Savings Account" />

                                <Service title="Investment Tracking" />

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="bg-gray-100 py-24">

                <div className="max-w-5xl mx-auto text-center px-6">

                    <h2 className="text-5xl font-bold">
                        Ready to Start Banking Smarter?
                    </h2>

                    <p className="mt-6 text-gray-600 text-lg">
                        Open your free account in under five minutes.
                    </p>

                    <button className="mt-10 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl inline-flex items-center gap-2">
                        Create Account
                        <ArrowRight size={20} />
                    </button>

                </div>

            </section>

        </main>
    );
}

function Feature({ icon, title, text }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <div className="text-blue-700 mb-5">{icon}</div>

            <h3 className="font-bold text-xl">
                {title}
            </h3>

            <p className="mt-4 text-gray-600">
                {text}
            </p>
        </div>
    );
}

function Stat({ number, label }) {
    return (
        <div>
            <h2 className="text-5xl font-bold">
                {number}
            </h2>

            <p className="mt-2 text-blue-100">
                {label}
            </p>
        </div>
    );
}

function Service({ title }) {
    return (
        <div className="flex items-center gap-4">
            <TrendingUp className="text-blue-700" />
            <span className="text-lg">{title}</span>
        </div>
    );
} -->