import { useState } from "react";
import { Container, Stack, Button } from "react-bootstrap";
import AddBudgetModal from "../components/AddBudgetModal";
import ViewExpensesModal from "../components/ViewExpensesModal";
import AddExpenseModal from "../components/AddExpenseModal";
import UncategorizedBudgetCard from "../components/UncategorizedBudgetCard";
import TotalBudgetCard from "../components/TotalBudgetCard";
import BudgetCard from "../components/BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../Store/BudgetsContext";





const App1 = () => {
    
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
    const {budgets, getBudgetExpenses} = useBudgets()
    
    const openAddExpenseModal = (budgetId) => {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId)
    }
     
    
    
    return (
        <>
            <Container>
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto">Budgets</h1>
                    <Button variant="warning" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
                    <Button variant="dark" onClick={openAddExpenseModal}>Add Expense</Button>
                </Stack>
                <div style={{ display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap:"1rem", alignItems:"flex-start"}}>
                    {budgets.map(budget => {
                        const amount = getBudgetExpenses(budget.id).reduce(
                            (total, expense) => total + expense.amount, 
                            0
                        )
                        return (
                            <BudgetCard
                                key={budget.id} 
                                name={budget.name}
                                amount={amount} 
                                max={budget.max}
                                openAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                            />
                        )
                    })}
                    <UncategorizedBudgetCard openAddExpenseClick={openAddExpenseModal}
                    onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
                    <TotalBudgetCard />           
                </div>
            </Container>
            <AddBudgetModal 
                show={showAddBudgetModal} 
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal 
                show={showAddExpenseModal}
                defaultBudgetId = {addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal 
                budgetId = {viewExpensesModalBudgetId}
                handleClose={() => setViewExpensesModalBudgetId()}
            />
        </> 
    );
}
 
export default App1;