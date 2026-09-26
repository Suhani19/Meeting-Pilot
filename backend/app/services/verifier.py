from typing import List, Dict, Any


def verify_actions(
    expected_actions: List[Dict[str, Any]],
    executed_actions: List[Dict[str, Any]]
) -> Dict[str, Any]:
    """
    Verifies that planned/expected actions match the actual executed tool actions.
    Ensures deterministic verification and agent integrity.
    """
    executed_targets = {act.get("target") for act in executed_actions if act.get("target")}
    missing_actions = []

    for exp in expected_actions:
        target = exp.get("target")
        if target and target not in executed_targets:
            missing_actions.append(exp)

    success = len(missing_actions) == 0

    if success:
        summary = f"All {len(expected_actions)} planned actions verified successfully."
    else:
        summary = f"Verification failed: {len(missing_actions)} expected actions were not executed."

    return {
        "success": success,
        "missing_actions": missing_actions,
        "summary": summary
    }
