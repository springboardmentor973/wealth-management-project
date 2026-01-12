def calculate_projection(current_amount: float,
                         monthly_contribution: float,
                         months_remaining: int,
                         expected_return_rate: float = 0.0):
    """
    Simple goal projection formula
    """

    projected_value = current_amount + (monthly_contribution * months_remaining)

    return projected_value
