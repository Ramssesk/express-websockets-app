const stripe = require('stripe')('sk_test_51IEPIuB8zchurVJ6KwolBcMG19Zuhvy4Qx7zbKkLJ96BXAIszWqlz2QYirNZcZB2ljawYE4GJKqQ7fjdgFtBMPXI00IYhukakV')

exports.payment = async (req,res) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 30099,
        currency: 'mxn',
    })

    res.json({clientSecret: paymentIntent.client_secret})
}