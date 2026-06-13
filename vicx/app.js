const TASK_ORDER = [
  "reach",
  "drawer_open",
  "window_open",
  "window_close",
  "coffee_button",
  "assembly",
];

const TASK_LABELS = {
  reach: "Reach",
  button_press: "Button Press",
  button_press_topdown: "Button Press Topdown",
  button_press_topdown_wall: "Button Press Topdown Wall",
  drawer_open: "Drawer Open",
  drawer_close: "Drawer Close",
  door_close: "Door Close",
  faucet_close: "Faucet Close",
  faucet_open: "Faucet Open",
  handle_press: "Handle Press",
  window_open: "Window Open",
  window_close: "Window Close",
  coffee_button: "Coffee Button",
  assembly: "Assembly",
  soccer_sweep: "Soccer Sweep",
};

const DEMO_DATA = {
  summary: {
    training: {
      data: {
        frames: 25,
        window_size: 25,
        window_stride: 2,
        num_context: 5,
        num_candidates: 20,
        num_examples: 6,
        state_dim: 4,
        target_state_dim: 40,
      },
      model: {
        num_refinement_layers: 3,
        frame_encoder_d_model: 256,
        temporal_decoder_layers: 4,
      },
      trainer: {
        max_steps: 8000,
        log_every_n_steps: 50,
      },
    },
    evaluation: {
      entrypoint: "control_metaworld/eval_sim/wan_v2t_eval.py",
      modes: [
        { slug: "existing_video", label: "Existing Video" },
        { slug: "wan_openloop", label: "WAN Open-Loop" },
        { slug: "wan_closedloop", label: "WAN Closed-Loop" },
      ],
    },
  },
  defaults: {
    available_modes: [
      {
        slug: "existing_video",
        label: "Existing Video",
        description: "Run V2T on a supplied video without WAN generation.",
      },
      {
        slug: "wan_openloop",
        label: "WAN Open-Loop",
        description: "Generate or reuse a WAN video, then run open-loop V2T evaluation.",
      },
      {
        slug: "wan_closedloop",
        label: "WAN Closed-Loop",
        description: "Iteratively plan and execute in MetaWorld with WAN + V2T.",
      },
    ],
    eval: {
      default_task: "drawer_open",
      default_wan_model: "wan27_dashscope_i2v",
      num_planning_cycles: 10,
      use_reference_trajectory: true,
    },
    v2t_model: {
      window_size: 25,
      window_stride: 24,
      num_context: 5,
      num_candidates: 20,
    },
    retrieval: {
      pool_size: 50,
    },
    wan_models: [
      { slug: "wan26_i2v" },
      { slug: "wan27_dashscope_i2v" },
      { slug: "wan27_openrouter_i2v" },
    ],
  },
  tasks: [
    {
      slug: "reach",
      name: "reach-v3",
      prompt:
        "Goal: Move the robot arm gripper to reach the target position marked in the scene.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. The target position is the red sphere. Continue from the current visual state while preserving the existing camera geometry and object identities.\n\nPriority order:\n1. Move the gripper along a direct, straight-line path towards the red sphere.\n2. The motion must be continuous and uninterrupted, starting from the first frame and proceeding without any pauses or hesitations.\n3. Maintain a constant velocity, ensuring the gripper makes steady, monotonic progress towards the red sphere in every frame.\n4. Stop the motion only when the center of the gripper is precisely aligned with the center of the red sphere at the end of the video.\n\nConstraints: The distance between the gripper and the red sphere must only decrease over time. The gripper must not reverse its direction of travel at any point. The entire reaching motion must be completed within the video duration. Use physically plausible arm motion only.",
      negative_prompt:
        "camera movement, panning, tilting, zooming, tracking shot, shaky cam, cinematic motion, changing viewpoint, wrist twist, rotating end effector, finger deformation, arm deformation, non-rigid arm, clipping, penetration, scene warp, flickering, blurry, low quality, distorted, unrealistic motion, hesitant motion, slow motion, pausing, stopping early, idle frames, reversing direction, moving away from target",
      evaluation_focus: [],
      scoring_guardrails: [],
      prompt_excerpt:
        "Move the gripper directly and monotonically toward the red target sphere, finishing with precise alignment and no hesitation.",
      negative_prompt_excerpt:
        "camera movement, shaky motion, geometry clipping, scene warp, unrealistic arm motion",
      evaluation_focus_count: 0,
      config_path: "control_metaworld/configs/task/reach.yaml",
    },
    {
      slug: "drawer_open",
      name: "drawer-open-v3",
      prompt:
        "Goal: Open the green drawer by pulling the white handle straight outward until the pulled-out drawer front or handle reaches the fixed green ball on the tabletop.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A green drawer cabinet sits on the right side of the table with a white horizontal handle protruding from the drawer front. Continue from the current visual state while preserving the existing camera geometry, object identities, and any progress already completed.\n\nPriority order:\n1. Begin motion in the first frame and move directly above the handle while keeping the initial finger spacing fixed.\n2. Descend fully before any outward pull begins.\n3. Establish a clean hooked contact from behind the handle without overlap, clipping, or entering the drawer cavity.\n4. Pull the drawer straight outward in pure translation until it is substantially open and stable.\n\nConstraints: No initial delay, no gripper aperture drift, no front-face pinching, no handle overlap, no drawer tilt, and no sideways slip. Keep the arm motion smooth and physically plausible.",
      negative_prompt: "",
      evaluation_focus: [
        "Verify that the gripper first aligns above the handle while keeping the same initial finger spacing.",
        "Check that full downward insertion is completed before the drawer begins moving outward.",
        "Verify that the red wrist link is centered on the middle of the handle at contact.",
        "Check that both fingers stay on opposite sides of the handle and the wrist stays outside the drawer front and cavity.",
        "Verify that the drawer translates straight outward with reference-like displacement and timing.",
      ],
      scoring_guardrails: [
        "Do not score highly if the gripper aperture changes at any point.",
        "Do not score highly if the handle is not seated between the fixed-spacing fingers before the pull.",
        "Do not score highly if the drawer starts moving before the full downward insertion is complete.",
        "Do not score highly if there is front-face pinching, overlap, clipping, or drawer-body intersection.",
      ],
      prompt_excerpt:
        "Approach the handle from above, fully seat the fixed-spacing gripper, then pull the drawer straight outward with stable contact.",
      negative_prompt_excerpt: "",
      evaluation_focus_count: 5,
      config_path: "control_metaworld/configs/task/drawer_open.yaml",
    },
    {
      slug: "faucet_open",
      name: "faucet-open-v3",
      prompt:
        "Goal: Push the red faucet handle to rotate around the fixed gray vertical stem until the black dot at the handle tip touches the green target point on the right.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A gray faucet base with a vertical gray cylinder is mounted on the table. A red horizontal handle with a black dot/cap at its free end is attached to the top of the gray stem. A blue target point lies on the left side of the handle's rotation path, and a green target point lies on the right side. Continue from the current visual state while preserving the same camera, arm, tabletop, faucet base, gray stem, red handle, black dot, blue target point, and green target point.\n\nPriority order:\n1. Start immediately and move directly toward the red handle's free side near the black-dotted end. Keep the gripper finger gap visually stable.\n2. Descend to handle height and use the gripper or wrist as a rigid pushing block, not as a hand that grasps or squeezes.\n3. Make clean side contact on the red handle body, preferably near the free end, without pushing the gray stem or faucet base.\n4. Push tangentially so the red handle rotates smoothly around the fixed gray vertical stem toward the right-side green target point. The handle must stay rigid and horizontal while rotating in the tabletop plane.\n5. Stop and hold once the black dot at the handle tip touches or overlaps the green target point; the faucet base and gray stem remain still.\n\nConstraints: No idle start, hovering, gripper aperture change, or grasping motion. The red handle may only rotate around the stationary gray stem; it must not lift, tilt, bend, stretch, detach, or translate without rotation. The faucet base must not slide or tip. Keep all objects rigid and avoid clipping or penetration. The success condition is the black dot at the handle tip reaching the right-side green target point. Do not push the gray stem or base, rotate the handle the wrong way, stop before the black dot reaches the green point, clip through the handle, or collide the wrist with the faucet.",
      negative_prompt: "",
      evaluation_focus: [],
      scoring_guardrails: [],
      prompt_excerpt:
        "Push the red faucet handle tangentially around the fixed stem until the black tip reaches the green target point.",
      negative_prompt_excerpt: "",
      evaluation_focus_count: 0,
      config_path: "control_metaworld/configs/task/faucet_open.yaml",
    },
    {
      slug: "handle_press",
      name: "handle-press-v3",
      prompt:
        "Goal: Press the red horizontal handle straight inward into the gray housing until it is clearly retracted.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A gray handle fixture sits on the table, with a red cylindrical handle protruding from its front opening. Continue from the current visual state while preserving the same camera, arm, tabletop, gray housing, and red handle.\n\nPriority order:\n1. Start immediately and move directly to the red protruding handle with no idle hover.\n2. Align the end effector with the centerline of the red handle at handle height. Keep the gripper finger spacing stable and do not pinch the handle.\n3. Make clean, non-penetrating contact on the end or side of the red handle using the rigid gripper/wrist surface.\n4. Push the red handle straight inward along its sliding axis into the gray housing until it is visibly depressed.\n5. Stop and hold after the handle is pressed, while the gray housing remains fixed and stable.\n\nConstraints: The camera is absolutely static. Treat the arm, gripper, red handle, gray housing, and tabletop as rigid bodies. The red handle may only translate inward along its intended axis; it must not rotate, tilt, bend, detach, move sideways, or pass through the housing walls. Avoid clipping, penetration, and any movement of the housing. Do not pinch or grasp the handle, close the gripper, push the gray housing, press off-center, or hover before action.",
      negative_prompt: "",
      evaluation_focus: [],
      scoring_guardrails: [],
      prompt_excerpt:
        "Push the red handle straight inward into the gray housing until it is visibly retracted.",
      negative_prompt_excerpt: "",
      evaluation_focus_count: 0,
      config_path: "control_metaworld/configs/task/handle_press.yaml",
    },
    {
      slug: "window_open",
      name: "window-open-v3",
      prompt:
        "Goal: Push the window open by moving it along its sliding track until it is fully open.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A sliding window is mounted on the table. Continue from the current visual state while preserving the existing camera geometry, object identities, and any progress already completed.\n\nPriority order:\n1. Move immediately to the window frame using a direct approach.\n2. Establish solid pushing contact.\n3. Apply a continuous pushing force parallel to the sliding track so the window translates purely horizontally to the right.\n4. Maintain constant-velocity push until the window is fully open.\n\nConstraints: The window must not rotate, hinge, tilt, or drift vertically. Keep the camera and background static.",
      negative_prompt:
        "camera drift, grasping, diagonal window motion, vertical motion, lifting, hinging, uneven sliding, unrealistic motion",
      evaluation_focus: [
        "Verify that the sliding pane visibly translates to the right along its horizontal track.",
        "Check consecutive frames for clear progress of the pane position, not just arm motion near the frame.",
        "Penalize leftward motion, hinge-like opening, rotation, or non-horizontal drift.",
      ],
      scoring_guardrails: [
        "Do not score task completion highly if the final frames do not show the window clearly more open than the initial frames.",
        "Do not score object state change highly if pane motion is tiny, ambiguous, or hidden by the arm.",
      ],
      prompt_excerpt:
        "Establish contact and push the sliding pane cleanly to the right with pure track-parallel translation until fully open.",
      negative_prompt_excerpt:
        "camera drift, diagonal motion, window lifting, hinge-like movement, unrealistic dynamics",
      evaluation_focus_count: 3,
      config_path: "control_metaworld/configs/task/window_open.yaml",
    },
    {
      slug: "window_close",
      name: "window-close-v3",
      prompt:
        "Goal: Pull or push the window closed by moving it along its sliding track until it is fully closed.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A sliding window is mounted on the table. Continue from the current visual state while preserving the existing camera geometry, object identities, and any progress already completed.\n\nPriority order:\n1. Move immediately to the window frame using a direct approach.\n2. Establish solid contact for closing.\n3. Move the window smoothly to the left in one decisive motion until fully closed.\n4. Stop once the window is fully closed.\n\nConstraints: Use physically plausible sliding motion only. Avoid lifting or tilting the window, minimize idle frames, and complete the closing as early as possible.",
      negative_prompt:
        "camera movement, grasping, sliding the window right, diagonal motion, vertical motion, lifting the window, unrealistic motion",
      evaluation_focus: [
        "Verify that the sliding pane visibly translates to the left and ends in a more closed position.",
        "Check consecutive frames for clear closing progress of the pane position, not just arm motion near the frame.",
        "Penalize rightward motion, reopening, hinge-like motion, rotation, or non-track drift.",
      ],
      scoring_guardrails: [
        "Do not score task completion highly if the final frames do not show the window clearly more closed than the initial frames.",
        "Do not score object state change highly if pane motion is tiny, ambiguous, or mostly hidden by the arm.",
      ],
      prompt_excerpt:
        "Make decisive contact and translate the sliding pane leftward to the closed position with no lift, tilt, or reopening.",
      negative_prompt_excerpt:
        "camera movement, rightward pane drift, vertical lift, unrealistic sliding behavior",
      evaluation_focus_count: 3,
      config_path: "control_metaworld/configs/task/window_close.yaml",
    },
    {
      slug: "coffee_button",
      name: "coffee-button-v3",
      prompt:
        "Goal: Press the coffee-machine button so the machine actuates while the mug stays under the dispenser.\n\nScene: Fixed corner-camera view of a red Sawyer arm above a wooden tabletop. A dark burgundy coffee machine with a pale top panel sits on the right, with a white mug beneath the dispenser area and a small pale round button on the machine body. Continue from the current visual state while preserving the same camera, tabletop, machine, mug, and arm identity.\n\nPriority order:\n1. Begin moving in the first frames with a short, direct approach toward the coffee-machine button.\n2. Align the wrist or gripper region cleanly with the small round machine button before contact.\n3. Make clean, non-penetrating contact and press in the correct inward direction.\n4. Hold a stable final pose without dragging the machine or disturbing the mug.\n\nConstraints: Treat the machine, button, mug, tabletop, and arm as rigid bodies. Keep motion smooth and physically plausible, avoid clipping, and complete the press early.",
      negative_prompt: "",
      evaluation_focus: [],
      scoring_guardrails: [],
      prompt_excerpt:
        "Directly align with the machine button, press inward cleanly, and keep the mug stable under the dispenser.",
      negative_prompt_excerpt: "",
      evaluation_focus_count: 0,
      config_path: "control_metaworld/configs/task/coffee_button.yaml",
    },
    {
      slug: "assembly",
      name: "assembly-v3",
      prompt:
        "Goal: Pick up the peg and insert it into the hole to complete the assembly task.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A peg and a hole fixture are positioned on the table. Continue from the current visual state while preserving the existing camera geometry, object identities, and any progress already completed.\n\nPriority order:\n1. Move the gripper directly to the peg using a short, direct approach.\n2. Close the gripper to grasp the peg securely.\n3. Lift the peg and align it with the hole.\n4. Insert the peg into the hole with a smooth downward motion.\n5. Release the gripper once the peg is fully inserted.\n\nConstraints: Use physically plausible grasping and insertion motion only. Maintain precise alignment during insertion, smooth controlled arm motion, minimize idle frames, and complete the assembly efficiently.",
      negative_prompt:
        "camera movement, wrist twist, clipping, penetration, dropping the peg, misaligned insertion, unrealistic motion",
      evaluation_focus: [],
      scoring_guardrails: [],
      prompt_excerpt:
        "Pick the peg cleanly, align over the hole, insert with a controlled downward motion, and release after full insertion.",
      negative_prompt_excerpt:
        "camera movement, dropped peg, clipping, misaligned insertion, unrealistic motion",
      evaluation_focus_count: 0,
      config_path: "control_metaworld/configs/task/assembly.yaml",
    },
  ],
  runs: [
    {
      run_id: "demo-reach-openloop",
      status: "succeeded",
      task: "reach",
      mode: "existing_video",
      num_context: 5,
      num_planning_cycles: 0,
    },
    {
      run_id: "demo-drawer-open-openloop",
      status: "succeeded",
      task: "drawer_open",
      mode: "existing_video",
      num_context: 5,
      num_planning_cycles: 0,
    },
    {
      run_id: "demo-window-open-openloop",
      status: "succeeded",
      task: "window_open",
      mode: "existing_video",
      num_context: 5,
      num_planning_cycles: 0,
    },
    {
      run_id: "demo-window-close-openloop",
      status: "succeeded",
      task: "window_close",
      mode: "existing_video",
      num_context: 5,
      num_planning_cycles: 0,
    },
    {
      run_id: "demo-coffee-button-openloop",
      status: "failed",
      task: "coffee_button",
      mode: "existing_video",
      num_context: 5,
      num_planning_cycles: 0,
    },
    {
      run_id: "demo-assembly-openloop",
      status: "failed",
      task: "assembly",
      mode: "existing_video",
      num_context: 5,
      num_planning_cycles: 0,
    },
  ],
  runDetails: {},
};

const state = {
  runs: [],
  selectedRunId: null,
  tasks: [],
  selectedTaskSlug: null,
  closedLoopTasks: [],
  selectedClosedLoopTaskSlug: null,
  selectedCrossEmbodimentTaskSlug: null,
  selectedStressTestTaskSlug: null,
  selectedInContextMetric: "successRate",
};

const CLOSED_LOOP_TASK_ORDER = [
  "button_press",
  "button_press_topdown",
  "coffee_button",
  "door_close",
  "drawer_close",
  "drawer_open",
  "faucet_close",
  "faucet_open",
  "handle_press",
];

const PAPER_CLOSED_LOOP_TASK_ORDER = [
  "button_press",
  "button_press_topdown",
  "coffee_button",
  "door_close",
  "drawer_close",
  "drawer_open",
  "faucet_close",
  "faucet_open",
  "handle_press",
];

const CLOSED_LOOP_SUCCESS_RATES = {
  button_press: { successes: 4, total: 20 },
  button_press_topdown: { successes: 17, total: 20 },
  coffee_button: { successes: 20, total: 20 },
  door_close: { successes: 20, total: 20 },
  drawer_close: { successes: 20, total: 20 },
  drawer_open: { successes: 15, total: 20 },
  faucet_close: { successes: 5, total: 20 },
  faucet_open: { successes: 9, total: 20 },
  handle_press: { successes: 20, total: 20 },
};

const CLOSED_LOOP_CONTEXT_COMPARISON = {
  button_press: {
    withContext: { successes: 4, total: 20, planningCyclesSum: 167 },
    noContext: { successes: 0, total: 20, planningCyclesSum: 200 },
  },
  button_press_topdown: {
    withContext: { successes: 17, total: 20, planningCyclesSum: 86.4 },
    noContext: { successes: 14, total: 20, planningCyclesSum: 92 },
  },
  coffee_button: {
    withContext: { successes: 20, total: 20, planningCyclesSum: 36 },
    noContext: { successes: 20, total: 20, planningCyclesSum: 24 },
  },
  door_close: {
    withContext: { successes: 20, total: 20, planningCyclesSum: 20 },
    noContext: { successes: 20, total: 20, planningCyclesSum: 20 },
  },
  drawer_close: {
    withContext: { successes: 20, total: 20, planningCyclesSum: 68 },
    noContext: { successes: 20, total: 20, planningCyclesSum: 63 },
  },
  drawer_open: {
    withContext: { successes: 15, total: 20, planningCyclesSum: 132 },
    noContext: { successes: 11, total: 20, planningCyclesSum: 141 },
  },
  faucet_close: {
    withContext: { successes: 5, total: 20, planningCyclesSum: 193 },
    noContext: { successes: 6, total: 20, planningCyclesSum: 170 },
  },
  faucet_open: {
    withContext: { successes: 9, total: 20, planningCyclesSum: 135 },
    noContext: { successes: 2, total: 20, planningCyclesSum: 185.2 },
  },
  handle_press: {
    withContext: { successes: 20, total: 20, planningCyclesSum: 20 },
    noContext: { successes: 20, total: 20, planningCyclesSum: 22 },
  },
};

const IN_CONTEXT_METRICS = {
  successRate: {
    label: "Success Rate",
    description:
      "Success rate is computed over 20 random seeds per task; higher is better.",
    maxValue: 100,
    ticks: [100, 75, 50, 25, 0],
    getValue: getSuccessPercentage,
    formatValue: (value) => `${Math.round(value)}%`,
    formatSummary: (rates) =>
      `${rates.withContext.successes}/${rates.withContext.total} vs ${rates.noContext.successes}/${rates.noContext.total}`,
  },
  averagePlanningTimes: {
    label: "Penalized Planning Count",
    description:
      "Penalized planning count assigns failed runs the full 10-cycle budget and averages the completed planning cycles; lower is better.",
    maxValue: 10,
    ticks: [10, 7.5, 5, 2.5, 0],
    getValue: getAveragePlanningTimes,
    formatValue: (value) => value.toFixed(1),
    formatSummary: (rates) =>
      `${getAveragePlanningTimes(rates.withContext).toFixed(2)} vs ${getAveragePlanningTimes(
        rates.noContext,
      ).toFixed(2)}`,
  },
};

const CLOSED_LOOP_TASK_OVERRIDES = {
  button_press: {
    name: "button-press-v3",
    prompt:
      "Goal: Press the red circular button with the red wrist link directly above the open white/cyan gripper, not the gripper or other arm links, until the gray stem is hidden and the button is depressed.\n\nScene: Fixed corner4 view. A red Sawyer arm is on the left above a wooden table. On the right, a yellow button box with a dark side face has a red circular cap on a short gray stem. The cap is pressable and slides inward along that stem into the box. Continue with the same camera and objects.\n\nPriority order:\n1. Start immediately, keep the gripper open, and bring the red wrist link just above the gripper directly from the left toward the red cap with no hover.\n2. Align that red wrist link at button height and centered on the cap face; the white/cyan gripper stays beside the contact area and does not pinch.\n3. Touch only the front center of the red cap with this red wrist link. Do not hit the yellow panel or gray stem first.\n4. Push horizontally along the gray stem toward the yellow box until the red cap retracts and the gray stem disappears. Keep the box fixed, then stop and hold.\n\nConstraints: Treat the button, stem, box, tabletop, and gripper as rigid bodies. The red button may only translate inward along its gray stem; it must not move sideways or vertically, tilt, rotate, detach, stretch, or deform. The box stays upright and still. Keep contact centered on the red cap, avoid clipping, keep camera/background static, and complete the press early.",
    negative_prompt: "",
    prompt_excerpt:
      "Press the front-facing red button with the correct wrist link while keeping the box fixed.",
    evaluation_focus_count: 5,
    config_path: "control_metaworld/configs/task/button_press.yaml",
  },
  button_press_topdown: {
    name: "button-press-topdown-v3",
    prompt:
      "Goal: Press the red top-mounted button straight downward until it is clearly depressed into the yellow housing.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A yellow button fixture sits on the table with a red circular button cap mounted on top of a short gray stem. Continue from the current visual state while preserving the same camera, arm, tabletop, and button fixture.\n\nPriority order:\n1. Initiate movement in the very first frame. Move continuously and efficiently in a direct path to a position centered directly above the red button cap. There must be zero idle frames at the start; do not pause, hover, or hesitate at any point during the motion.\n2. Maintain a rigid arm structure throughout the approach. Align the end effector squarely over the center of the red cap before contact. Keep the initial finger spacing visually unchanged.\n3. Descend vertically in a straight line from the centered position above. Make clean, non-penetrating contact on the top surface of the red cap. Do not strike the yellow housing or table.\n4. Push the red cap straight downward along its intended press axis until it is clearly depressed into the housing, then stop and hold a stable final pose.\n\nConstraints: The robot arm itself must be treated as a single, solid, rigid body; it must not bend, stretch, warp, or change shape. Treat the button, gray stem, yellow housing, and tabletop as rigid bodies. The red button may only translate downward along its press axis without tilting or deforming. All motion must be physically plausible. Avoid clipping or interpenetration between any objects. Keep the camera and background static.",
    negative_prompt: "",
    prompt_excerpt:
      "Move directly above the top-mounted red button and press straight downward into the housing.",
    evaluation_focus_count: 0,
    config_path: "control_metaworld/configs/task/button_press_topdown.yaml",
  },
  button_press_topdown_wall: {
    name: "button-press-topdown-wall-v3",
    prompt:
      "Goal: Press the red top-mounted button straight downward until it is clearly depressed while keeping the nearby wall fixture stable.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A yellow button fixture with a red circular button cap sits close to a dark vertical wall or backstop. Continue from the current visual state while preserving the same camera, arm, tabletop, wall, and button fixture.\n\nPriority order:\n1. Start moving immediately, taking a direct path to a position centered above the red button cap.\n2. Align the end effector squarely over the button center before contact, keeping the fingers and wrist clear of the wall and fixture.\n3. Descend vertically. The instant the gripper makes contact with the red button cap, the button MUST react by moving straight down. The gripper pushes the button; they cannot pass through each other.\n4. Continue the single, smooth downward push, forcing the red cap to slide vertically into the yellow housing until fully depressed, then hold the final pose.\n\nConstraints: The arm and button are solid, rigid, non-penetrable objects. They cannot clip, merge, or pass through each other. Upon contact, the arm's force MUST be transferred to the button, causing it to move. The button's only allowed motion is pure vertical translation downward into its housing; it cannot tilt, rotate, or deform. The camera, background, wall, and yellow button housing are absolutely static.",
    negative_prompt: "",
    prompt_excerpt:
      "Press the top button downward while avoiding contact with the nearby wall fixture.",
    evaluation_focus_count: 0,
    config_path: "control_metaworld/configs/task/button_press_topdown_wall.yaml",
  },
  door_close: {
    name: "door-close-v3",
    prompt:
      "Goal: Swing the door shut by contacting the handle/door edge and rotating the door inward until it reaches a clearly closed position.\n\nScene: Fixed corner-camera view of a red Sawyer arm above a wooden tabletop next to a dark blue freestanding door assembly. The camera view MUST remain absolutely static and fixed throughout the entire video. Continue from the current visual state, preserving the camera, arm, tabletop, and door assembly.\n\nPriority order:\n1. Start immediately and move directly toward the handle or effective pushing point. Do not hover or take a wide detour.\n2. Establish clean, non-penetrating contact on the correct part of the door and orient the end effector to drive the door along its hinge path.\n3. Push the door in one smooth, continuous inward swing around its hinge. The rotation must be gradual and consistent across all frames, with no jumps, skips, or teleportation.\n4. Once the door is fully closed against the frame, stop the arm and hold a stable final pose.\n\nConstraints:\n- Top Priority: The camera is absolutely static. There is no panning, tilting, zooming, or any camera movement. The background scene, tabletop, and door frame must not change, warp, or drift.\n- Rigidity: The red robot arm is a single, solid, rigid object. Its links and joints must not stretch, warp, bend, or deform. Maintain its shape and proportions perfectly from the initial frame. All other objects are also rigid.\n- Motion Physics: The door's motion must be a continuous rotation ONLY around its hinge axis. It cannot teleport, detach, translate, or change position instantaneously. All contact must be physically plausible without penetration or clipping.",
    negative_prompt: "",
    prompt_excerpt:
      "Make clean contact with the door and swing it inward around its hinge until closed.",
    evaluation_focus_count: 0,
    config_path: "control_metaworld/configs/task/door_close.yaml",
  },
  drawer_close: {
    name: "drawer-close-v3",
    prompt:
      "Goal: Close the open green drawer by contacting the white handle or the center of the drawer front and pushing the drawer straight inward until it is flush with the cabinet.\n\nScene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A green drawer cabinet sits on the right side of the table, and its drawer begins open with the green front face and white horizontal handle protruding outward from the cabinet. Continue from the current visual state while preserving the existing camera geometry, object identities, and any progress already completed.\n\nPriority order:\n1. Begin motion in the first frame. Horizontally align the center of the gripper with the center of the white handle. The gripper is a rigid block with fixed finger spacing. Move to a pre-contact position directly above the handle's center.\n2. Descend straight down vertically. The red wrist link must not lead; the gripper fingers must be the lowest part of the arm. Stop descending upon making clean, external contact.\n3. Contact must ONLY be made with the gripper's parallel fingers or the flat surface between them. The red wrist link must NEVER touch the drawer or handle. The gripper must remain horizontally centered on the handle.\n4. After contact, push the drawer straight inward horizontally. This push must cause the drawer to translate smoothly along its rails without any tilting or rotation, until its green front is flush with the cabinet.\n\nConstraints: Motion must begin immediately. The gripper's finger spacing is absolutely fixed; treat it as a single rigid block. The gripper must remain horizontally centered on the white handle throughout the entire motion. Contact is ONLY allowed with the gripper fingers or palm; the red wrist link MUST NOT touch the drawer. The green drawer must ONLY translate straight inward without rotating, tilting, or dropping.",
    negative_prompt: "",
    prompt_excerpt:
      "Center the rigid gripper on the drawer handle, descend, then push the drawer straight inward.",
    evaluation_focus_count: 0,
    config_path: "control_metaworld/configs/task/drawer_close.yaml",
  },
  faucet_close: {
    name: "faucet-close-v3",
    prompt:
      "Goal: Close the faucet by pushing, not grasping, the red horizontal handle. The gray vertical cylinder is the fixed pivot. The red handle rotates clockwise around it like a clock hand around a center pin. The gray stem and base stay still.\n\nScene: Corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden table. On one side of the table is a gray faucet base with a vertical gray cylinder. A red horizontal handle is mounted on top and starts open, with a small black cap at the free end. Colored table markers are irrelevant.\n\nPriority order:\n1. Start in the first frame. Keep the gripper finger gap fixed. Move directly to the red handle's left/free side near the black cap.\n2. Descend to handle height. Use the gripper as a rigid pushing block, not a hand that opens, closes, or grabs.\n3. Make solid side contact on the red handle body, preferably the middle/left half. Do not touch or push the gray cylinder.\n4. Push leftward and tangentially along the circular arc around the gray cylinder. The red bar stays horizontal and rigid while rotating clockwise around the fixed stem. Stop at the closed angle shown by the reference.\n\nConstraints: No idle start, hovering, or gripper aperture change. The red handle only rotates in the tabletop plane around the stationary gray cylinder. Do not lift, tilt, bend, stretch, detach, or translate the handle. Do not slide the faucet base. Keep all objects rigid and stable.",
    negative_prompt:
      "grasping the handle, closing the fingers, opening the fingers, squeezing, gripper aperture change, pushing the gray stem, pushing the gray base, faucet base sliding, handle lifting, handle tilting, handle bending, handle stretching, handle detaching, handle translating without rotation, finger clipping through the handle, wrist collision with faucet, idle start, hovering before action",
    prompt_excerpt:
      "Use the gripper as a rigid pusher to rotate the faucet handle clockwise around the fixed stem.",
    evaluation_focus_count: 5,
    config_path: "control_metaworld/configs/task/faucet_close.yaml",
  },
};

const CROSS_EMBODIMENT_EXISTING_MEDIA = {
  button_press_topdown: "assets/cross-embodiment/button_press_topdown_demo.mp4",
  drawer_close: "assets/cross-embodiment/drawer_close_demo.mp4",
  faucet_open: "assets/cross-embodiment/faucet_open_demo.mp4",
};

const CROSS_EMBODIMENT_VARIANT_MEDIA = {
  button_press: ["fail"],
  button_press_topdown: ["succ1", "succ2", "fail"],
  coffee_button: ["succ1", "succ2", "succ3", "fail"],
  door_close: ["succ1", "succ2", "succ3"],
  drawer_close: ["succ1", "succ2", "fail"],
  drawer_open: ["succ1", "succ2", "succ3", "fail"],
  faucet_close: ["fail"],
  faucet_open: ["succ1", "succ2", "fail"],
  handle_press: ["succ1", "succ2", "succ3"],
};

let CROSS_EMBODIMENT_DEMOS = [
  {
    slug: "drawer_close",
    name: "drawer-close-v3",
    label: "Drawer Close",
    video: "assets/cross-embodiment/drawer_close_demo.mp4",
    description:
      "Cross-embodiment closed-loop execution on the shifted orange-arm environment.",
    prompt: `Goal: Close the open green drawer by contacting the white handle or the center of the drawer front and pushing the drawer straight inward until it is flush with the cabinet.

Scene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A green drawer cabinet sits on the right side of the table, and its drawer begins open with the green front face and white horizontal handle protruding outward from the cabinet. Continue from the current visual state while preserving the existing camera geometry, object identities, and any progress already completed.

Priority order:
1. Begin motion in the first frame. Horizontally align the center of the gripper with the center of the white handle. The gripper is a rigid block with fixed finger spacing. Move to a pre-contact position directly above the handle's center.
2. Descend straight down vertically. The red wrist link must not lead; the gripper fingers must be the lowest part of the arm. Stop descending upon making clean, external contact.
3. Contact must ONLY be made with the gripper's parallel fingers or the flat surface between them. The red wrist link must NEVER touch the drawer or handle. The gripper must remain horizontally centered on the handle.
4. After contact, push the drawer straight inward horizontally. This push must cause the drawer to translate smoothly along its rails without any tilting or rotation, until its green front is flush with the cabinet.

Constraints: Motion must begin immediately. The gripper's finger spacing is absolutely fixed; treat it as a single rigid block. The gripper must remain horizontally centered on the white handle throughout the entire motion. Contact is ONLY allowed with the gripper fingers or palm; the red wrist link MUST NOT touch the drawer. All objects are solid and cannot penetrate. The motion is a strict sequence: 1. pure vertical descent to a centered contact point, 2. pure horizontal push. Do not blend into a diagonal path. The green drawer must ONLY translate straight inward, without rotating, tilting, or dropping. The final state is the drawer fully closed and flush with the cabinet.`,
  },
  {
    slug: "button_press_topdown",
    name: "button-press-topdown-v3",
    label: "Button Press Topdown",
    video: "assets/cross-embodiment/button_press_topdown_demo.mp4",
    description:
      "Cross-embodiment closed-loop execution on the shifted orange-arm environment.",
    prompt: `Goal: Press the red top-mounted button straight downward until it is clearly depressed into the yellow housing.

Scene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden tabletop. A yellow button fixture sits on the table with a red circular button cap mounted on top of a short gray stem. Continue from the current visual state while preserving the same camera, arm, tabletop, and button fixture.

Priority order:
1. Move efficiently in a direct path to a position centered directly above the red button cap.
2. Descend vertically in one single, continuous motion. Do not slow down or pause upon making contact with the button's top surface.
3. As the arm pushes down, it MUST force the red button to descend into the yellow housing. The button's downward motion is a direct consequence of and perfectly synchronized with the arm's downward push.
4. Continue pushing until the button is fully depressed, then hold this final position rigidly. The video must end with the arm held perfectly still, maintaining pressure on the button.

Constraints: The robot arm is a single solid, rigid object. Objects cannot interpenetrate. The arm's motion is exclusively downward after initial alignment; there is absolutely no upward motion, retraction, or reversal of direction at any point. The red button's state change is a direct consequence of the arm's push; if the arm moves down, the button MUST move down with it. The button only translates vertically, it cannot tilt or rotate. The final state is critical: the arm must be completely static, holding the button fully depressed (top of red cap at or below the top of the yellow housing) for the entire final shot. The camera, tabletop, and yellow housing must remain static.`,
  },
  {
    slug: "faucet_open",
    name: "faucet-open-v3",
    label: "Faucet Open",
    video: "assets/cross-embodiment/faucet_open_demo.mp4",
    description:
      "Cross-embodiment closed-loop execution on the shifted orange-arm environment.",
    prompt: `Goal: Open the faucet by pushing, not grasping, the red horizontal handle. The gray vertical cylinder is the fixed pivot. The red handle rotates counter-clockwise around it. The gray stem and base stay still.

Scene: Static corner-camera view of a red Sawyer arm with a parallel-jaw gripper above a wooden table. On the table is a gray faucet base with a vertical gray cylinder. A red horizontal handle is mounted on top, starting closed. The robot arm is always present and fully visible. This is a continuation of the first frame.

Priority order:
1. Start immediately. Move the gripper in a straight line to a position directly above the right end of the red handle.
2. Descend vertically until the side of the gripper makes firm contact with the side of the red handle. Do not touch the gray cylinder.
3. Using the side of the gripper, push the red handle counter-clockwise in a smooth, continuous circular arc. The center of rotation is the gray cylinder.
4. Continue the push without stopping until the handle has rotated a full 90 degrees and points towards the back of the scene, achieving the fully open position.

Constraints: The camera is static. No camera pan, zoom, or rotation. The robot arm is a single, rigid, persistent object that does not warp, disappear, or break. The gripper fingers remain perfectly still and parallel; the gap between them never changes. Do not grasp or squeeze. The push must be a single, continuous motion that completes the full 90-degree rotation without stopping prematurely. The red handle only rotates horizontally around the stationary gray cylinder. Do not lift, tilt, bend, or detach the handle. The gray faucet base and stem are completely stationary and fixed to the table.`,
  },
];

const STRESS_TEST_DEMOS = [
  {
    slug: "soccer_sweep",
    name: "sweep-soccer-into-hole",
    label: "Soccer Sweep",
    video: "assets/stress-test/soccer_sweep_demo.mp4",
    description:
      "Closed-loop stress-test execution in a custom scene outside the Meta-World benchmark.",
    media: [
      {
        kind: "success",
        label: "Representative Success",
        relative_path: "soccer_sweep_demo.mp4",
        url: "assets/stress-test/soccer_sweep_demo.mp4",
      },
      {
        kind: "failure",
        label: "V12 Failure",
        relative_path: "soccer_sweep_v12_fail.mp4",
        url: "assets/stress-test/soccer_sweep_v12_fail.mp4",
      },
    ],
    prompt: `Goal: Use the robot arm to sweep the soccer ball across the table and into the dark hole where the blue sphere marker is located.

Scene: Fixed corner-camera view of a red Sawyer arm with a parallel-jaw gripper holding a black-and-white soccer ball above a wooden tabletop enclosed by grey metal retaining walls. A dark rectangular hole is cut into the table nearby, with a small blue sphere marking the target position inside the hole. Continue from the current visual state while preserving the existing camera geometry, object identities, and any progress already completed.

Priority order:

1. Immediately move the gripper straight down to place the soccer ball on the table surface directly below its starting position. The gripper fingers must remain rigid.

2. Without touching the ball, retract the gripper slightly upwards, then move it in an arc to a position behind the ball (on the side opposite the hole). Keep the gripper fingers at a fixed spacing.

3. Lower the gripper until its inner face is level with the ball's center. Push the ball with a smooth, continuous motion at a constant velocity in a straight line toward the dark hole. The gripper must maintain contact with the ball.

4. Continue pushing until the ball falls completely into the hole. The arm must then come to a complete stop and hold its final pose for the remainder of the video.

Constraints: The robot arm and gripper must behave as a single, rigid, articulated structure. No part of the arm should bend, stretch, warp, or deform. The gripper finger spacing must remain constant throughout the repositioning and pushing phases. The soccer ball must always stay on the table surface after being placed; it must not be lifted, bounced, or go airborne. The push motion must be a smooth, horizontal slide or roll. The arm must hold its final configuration without retracting. Background, camera, and lighting must remain static. Avoid all clipping and object penetration.`,
  },
];

const TASKS_WITH_TRAJECTORY_IMAGE = new Set([
  "assembly",
  "coffee_button",
  "drawer_open",
  "reach",
  "window_close",
  "window_open",
]);

const BASELINE_SUMMARIES = {
  reach: {
    num_frames_executed: 51,
    mean_tracking_error: 0.00101243371190835,
    success: true,
    stop_reason: "task_success",
    num_context: 5,
    num_candidates: 20,
    window_size: 25,
    window_stride: 24,
    use_reference_trajectory: false,
  },
  drawer_open: {
    num_frames_executed: 87,
    mean_tracking_error: 0.0010239461209400568,
    success: true,
    stop_reason: "task_success",
    num_context: 5,
    num_candidates: 20,
    window_size: 25,
    window_stride: 24,
    use_reference_trajectory: false,
  },
  window_open: {
    num_frames_executed: 89,
    mean_tracking_error: 0.0010929858508031734,
    success: true,
    stop_reason: "task_success",
    num_context: 5,
    num_candidates: 20,
    window_size: 25,
    window_stride: 24,
    use_reference_trajectory: false,
  },
  window_close: {
    num_frames_executed: 81,
    mean_tracking_error: 0.0009970122760131813,
    success: true,
    stop_reason: "task_success",
    num_context: 5,
    num_candidates: 20,
    window_size: 25,
    window_stride: 24,
    use_reference_trajectory: false,
  },
  coffee_button: {
    num_frames_executed: 34,
    mean_tracking_error: 0.0009938862193599597,
    success: false,
    stop_reason: "completed_all_segments",
    num_context: 5,
    num_candidates: 20,
    window_size: 25,
    window_stride: 24,
    use_reference_trajectory: false,
  },
  assembly: {
    num_frames_executed: 83,
    mean_tracking_error: 0.0009943153004304368,
    success: false,
    stop_reason: "completed_all_segments",
    num_context: 5,
    num_candidates: 20,
    window_size: 25,
    window_stride: 24,
    use_reference_trajectory: false,
  },
};

function buildTaskMedia(taskSlug) {
  return {
    video: {
      kind: "video",
      relative_path: "comparison_video.mp4",
      url: `assets/tasks/${taskSlug}/comparison_video.mp4`,
    },
    image: TASKS_WITH_TRAJECTORY_IMAGE.has(taskSlug)
      ? {
          kind: "image",
          relative_path: "state_trajectory.png",
          url: `assets/tasks/${taskSlug}/state_trajectory.png`,
        }
      : null,
  };
}

function buildClosedLoopTasks() {
  const openLoopTaskMap = new Map(DEMO_DATA.tasks.map((task) => [task.slug, task]));
  return CLOSED_LOOP_TASK_ORDER.map((slug) => {
    const task = CLOSED_LOOP_TASK_OVERRIDES[slug] || openLoopTaskMap.get(slug);
    const rate = CLOSED_LOOP_SUCCESS_RATES[slug] || { successes: 0, total: 0 };
    const media = [
      {
        kind: "success",
        label: "Success 1",
        relative_path: `${slug}_success.mp4`,
        url: `assets/closed-loop/tasks/${slug}/${slug}_success.mp4`,
      },
      {
        kind: "success",
        label: "Success 2",
        relative_path: `${slug}_succ1.mp4`,
        url: `assets/closed-loop/tasks/${slug}/${slug}_succ1.mp4`,
      },
      {
        kind: "success",
        label: "Success 3",
        relative_path: `${slug}_succ2.mp4`,
        url: `assets/closed-loop/tasks/${slug}/${slug}_succ2.mp4`,
      },
    ];
    if (rate.successes < rate.total) {
      media.push({
        kind: "failure",
        label: "Failure",
        relative_path: `${slug}_fail.mp4`,
        url: `assets/closed-loop/tasks/${slug}/${slug}_fail.mp4`,
      });
    }
    return {
      ...task,
      slug,
      media,
    };
  }).filter((task) => task.name);
}

function buildCrossEmbodimentDemos() {
  const openLoopTaskMap = new Map(DEMO_DATA.tasks.map((task) => [task.slug, task]));
  return CLOSED_LOOP_TASK_ORDER.map((slug) => {
    const task = CLOSED_LOOP_TASK_OVERRIDES[slug] || openLoopTaskMap.get(slug);
    if (!task) {
      return null;
    }
    const media = [];
    if (CROSS_EMBODIMENT_EXISTING_MEDIA[slug]) {
      media.push({
        kind: "success",
        label: "Representative Success",
        relative_path: CROSS_EMBODIMENT_EXISTING_MEDIA[slug].replace("assets/cross-embodiment/", ""),
        url: CROSS_EMBODIMENT_EXISTING_MEDIA[slug],
      });
    }
    for (const variant of CROSS_EMBODIMENT_VARIANT_MEDIA[slug] || []) {
      const isFailure = variant === "fail";
      media.push({
        kind: isFailure ? "failure" : "success",
        label: isFailure ? "V9 Failure" : `V9 Success ${variant.replace("succ", "")}`,
        relative_path: `v9/${slug}_v9_${variant}.mp4`,
        url: `assets/cross-embodiment/v9/${slug}_v9_${variant}.mp4`,
      });
    }
    const successCount = media.filter((item) => item.kind === "success").length;
    const failureCount = media.filter((item) => item.kind === "failure").length;
    let galleryNote = "";
    if (media.length < 4 && successCount > 0 && failureCount === 0) {
      galleryNote =
        "Only success clips are shown because the available source examples for this task are all successful.";
    } else if (media.length < 4 && successCount === 0 && failureCount > 0) {
      galleryNote =
        "Only failure clips are shown because the available source examples for this task are all failed.";
    } else if (media.length < 4) {
      galleryNote =
        "This task shows fewer than four clips because only these examples are available in the source folder.";
    }
    return {
      slug,
      name: task.name,
      label: getTaskDisplayName(slug),
      description:
        "Cross-embodiment closed-loop execution on the shifted orange-arm environment.",
      prompt: task.prompt || task.prompt_excerpt || "",
      media,
      galleryNote,
    };
  }).filter(Boolean);
}

function buildRunDetails() {
  for (const run of DEMO_DATA.runs) {
    const summary = BASELINE_SUMMARIES[run.task];
    const media = buildTaskMedia(run.task);
    DEMO_DATA.runDetails[run.run_id] = {
      run_id: run.run_id,
      task: run.task,
      mode: run.mode,
      status: run.status,
      summary,
      artifacts: [media.video, media.image],
      log_tail:
        `[DEMO PACKAGE] Loaded precomputed baseline artifacts.\n` +
        `Task: ${run.task}\n` +
        `Mode: ${run.mode}\n` +
        `Frames executed: ${summary.num_frames_executed}\n` +
        `Mean tracking error: ${summary.mean_tracking_error}\n` +
        `Stop reason: ${summary.stop_reason}\n` +
        `Reference trajectory: ${summary.use_reference_trajectory ? "on" : "off"}`,
    };
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[character];
  });
}

function getOrderedTasks(tasks) {
  const taskMap = new Map(tasks.map((task) => [task.slug, task]));
  return TASK_ORDER.map((slug) => taskMap.get(slug)).filter(Boolean);
}

function getTaskBySlug(taskSlug) {
  return state.tasks.find((task) => task.slug === taskSlug) || null;
}

function getClosedLoopTaskBySlug(taskSlug) {
  return state.closedLoopTasks.find((task) => task.slug === taskSlug) || null;
}

function getTaskDisplayName(taskSlug) {
  return TASK_LABELS[taskSlug] || taskSlug;
}

function updateTaskTabReminder(reminderId, selectedLabel, detailText) {
  const reminderNode = document.getElementById(reminderId);
  if (!reminderNode) {
    return;
  }
  reminderNode.innerHTML = `
    <span class="reminder-arrow" aria-hidden="true">↓</span>
    <span>
      <strong>Choose a task tab below.</strong>
      <em>Now showing: ${escapeHtml(selectedLabel)}.</em>
      ${escapeHtml(detailText)}
    </span>
  `;
}

function populateSummary(summary) {
  const heroMetrics = document.getElementById("hero-metrics");
  if (heroMetrics) {
    heroMetrics.innerHTML = `
      <li><strong>Training Window</strong> <span>${summary.training.data.window_size} frames</span></li>
      <li><strong>Evaluation Entrypoint</strong> <span>${summary.evaluation.entrypoint}</span></li>
      <li><strong>Modes</strong> <span>${summary.evaluation.modes.map((mode) => mode.label).join(" / ")}</span></li>
    `;
  }

  const trainingSpecs = document.getElementById("training-specs");
  if (trainingSpecs) {
    trainingSpecs.innerHTML = `
      <li><strong>Contexts/Frame</strong> <span>${summary.training.data.num_context}</span></li>
      <li><strong>State Projection</strong> <span>${summary.training.data.state_dim}D → ${summary.training.data.target_state_dim}D</span></li>
      <li><strong>Refinement Layers</strong> <span>${summary.training.model.num_refinement_layers}</span></li>
      <li><strong>Encoder Dim</strong> <span>${summary.training.model.frame_encoder_d_model}</span></li>
      <li><strong>Temporal Decoder</strong> <span>${summary.training.model.temporal_decoder_layers} layers</span></li>
      <li><strong>Max Steps</strong> <span>${summary.training.trainer.max_steps}</span></li>
    `;
  }
}

function renderTaskSelector() {
  const selectorNode = document.getElementById("task-selector");
  if (!selectorNode) {
    return;
  }
  selectorNode.innerHTML = state.tasks
    .map((task) => {
      const isActive = task.slug === state.selectedTaskSlug;
      return `
        <button
          type="button"
          class="task-selector-card${isActive ? " is-active" : ""}"
          data-task-slug="${task.slug}"
        >
          <strong>${escapeHtml(getTaskDisplayName(task.slug))}</strong>
          <span>${escapeHtml(task.name)}</span>
        </button>
      `;
    })
    .join("");

  selectorNode.querySelectorAll("[data-task-slug]").forEach((node) => {
    node.addEventListener("click", () => {
      selectTask(node.dataset.taskSlug);
    });
  });
}

function renderTaskProgramDetail() {
  const detailNode = document.getElementById("task-program-detail");
  if (!detailNode) {
    return;
  }
  const task = getTaskBySlug(state.selectedTaskSlug);
  if (!task) {
    detailNode.innerHTML = `<p class="lead">No task metadata available.</p>`;
    return;
  }

  const media = buildTaskMedia(task.slug);
  detailNode.innerHTML = `
    <div class="task-program-intro">
      <h3>${escapeHtml(getTaskDisplayName(task.slug))}</h3>
      <p>${escapeHtml(task.prompt_excerpt)}</p>
    </div>

    <div class="task-badges">
      <span class="task-badge">${escapeHtml(task.name)}</span>
      <span class="task-badge">WAN + V2T open-loop</span>
      <span class="task-badge">${escapeHtml(task.config_path)}</span>
    </div>

    <div class="task-media-grid">
      <div class="task-media-card">
        <video controls autoplay muted src="${media.video.url}"></video>
        <p>${escapeHtml(media.video.relative_path)}</p>
      </div>
      ${
        media.image
          ? `
            <div class="task-media-card">
              <img src="${media.image.url}" alt="${escapeHtml(task.slug)} trajectory plot" />
              <p>${escapeHtml(media.image.relative_path)}</p>
            </div>
          `
          : ""
      }
    </div>
  `;
}

function selectTask(taskSlug) {
  state.selectedTaskSlug = taskSlug;
  const taskNode = document.getElementById("task");
  if (taskNode && taskNode.querySelector(`option[value="${taskSlug}"]`)) {
    taskNode.value = taskSlug;
  }
  renderTaskSelector();
  renderTaskProgramDetail();
}

function renderClosedLoopTaskSelector() {
  const selectorNode = document.getElementById("closed-loop-task-selector");
  if (!selectorNode) {
    return;
  }
  selectorNode.innerHTML = state.closedLoopTasks
    .map((task) => {
      const isActive = task.slug === state.selectedClosedLoopTaskSlug;
      return `
        <button
          type="button"
          class="task-selector-card${isActive ? " is-active" : ""}"
          data-closed-loop-task-slug="${task.slug}"
        >
          <strong>${escapeHtml(getTaskDisplayName(task.slug))}</strong>
          <span>${escapeHtml(task.name)}</span>
        </button>
      `;
    })
    .join("");

  selectorNode.querySelectorAll("[data-closed-loop-task-slug]").forEach((node) => {
    node.addEventListener("click", () => {
      selectClosedLoopTask(node.dataset.closedLoopTaskSlug);
    });
  });
}

function renderClosedLoopSuccessRates() {
  const ratesNode = document.getElementById("closed-loop-success-rates");
  if (!ratesNode) {
    return;
  }
  ratesNode.innerHTML = PAPER_CLOSED_LOOP_TASK_ORDER
    .map((taskSlug) => {
      const rate = CLOSED_LOOP_SUCCESS_RATES[taskSlug] || { successes: 0, total: 0 };
      const percentage = rate.total > 0 ? Math.round((100 * rate.successes) / rate.total) : 0;
      return `
        <div class="success-rate-card">
          <strong>${escapeHtml(getTaskDisplayName(taskSlug))}</strong>
          <span>${percentage}%</span>
          <small>${rate.successes}/${rate.total} seeds</small>
        </div>
      `;
    })
    .join("");
}

function getSuccessPercentage(rate) {
  return rate.total > 0 ? (100 * rate.successes) / rate.total : 0;
}

function getAveragePlanningTimes(rate) {
  return rate.total > 0 ? rate.planningCyclesSum / rate.total : 0;
}

function renderInContextMetricSelector() {
  const selectorNode = document.getElementById("in-context-metric-selector");
  if (!selectorNode) {
    return;
  }

  selectorNode.innerHTML = Object.entries(IN_CONTEXT_METRICS)
    .map(([metricKey, metric]) => {
      const isActive = state.selectedInContextMetric === metricKey;
      return `
        <button
          type="button"
          class="metric-selector-button ${isActive ? "active" : ""}"
          data-in-context-metric="${metricKey}"
        >
          ${escapeHtml(metric.label)}
        </button>
      `;
    })
    .join("");

  selectorNode.querySelectorAll("[data-in-context-metric]").forEach((button) => {
    button.addEventListener("click", () => {
      selectInContextMetric(button.dataset.inContextMetric);
    });
  });
}

function selectInContextMetric(metricKey) {
  if (!IN_CONTEXT_METRICS[metricKey]) {
    return;
  }

  state.selectedInContextMetric = metricKey;
  renderInContextMetricSelector();
  renderClosedLoopComparisonChart();
}

function renderClosedLoopComparisonChart() {
  const chartNode = document.getElementById("closed-loop-context-chart");
  if (!chartNode) {
    return;
  }

  const metric = IN_CONTEXT_METRICS[state.selectedInContextMetric];
  const descriptionNode = document.getElementById("in-context-metric-description");
  if (descriptionNode) {
    descriptionNode.textContent = metric.description;
  }

  const rows = Object.entries(CLOSED_LOOP_CONTEXT_COMPARISON);
  chartNode.innerHTML = `
    <div class="chart-legend">
      <span><i class="legend-swatch with-context"></i>5 context</span>
      <span><i class="legend-swatch no-context"></i>0 context</span>
    </div>
    <div class="chart-y-axis">
      ${metric.ticks.map((tick) => `<span>${metric.formatValue(tick)}</span>`).join("")}
    </div>
    <div class="chart-plot">
      ${rows
        .map(([taskSlug, rates]) => {
          const withContextValue = metric.getValue(rates.withContext);
          const noContextValue = metric.getValue(rates.noContext);
          const withContextHeight = (100 * withContextValue) / metric.maxValue;
          const noContextHeight = (100 * noContextValue) / metric.maxValue;
          return `
            <div class="chart-task-group">
              <div class="bar-pair">
                <div class="bar-wrap">
                  <div
                    class="comparison-bar with-context"
                    data-target-height="${withContextHeight}"
                  >
                    <span>${metric.formatValue(withContextValue)}</span>
                  </div>
                </div>
                <div class="bar-wrap">
                  <div
                    class="comparison-bar no-context"
                    data-target-height="${noContextHeight}"
                  >
                    <span>${metric.formatValue(noContextValue)}</span>
                  </div>
                </div>
              </div>
              <strong>${escapeHtml(getTaskDisplayName(taskSlug))}</strong>
              <small>${metric.formatSummary(rates)}</small>
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  requestAnimationFrame(() => {
    chartNode.querySelectorAll(".comparison-bar").forEach((bar) => {
      bar.style.height = `${bar.dataset.targetHeight}%`;
    });
  });
}

function renderClosedLoopTaskDetail() {
  const detailNode = document.getElementById("closed-loop-task-detail");
  if (!detailNode) {
    return;
  }
  const task = getClosedLoopTaskBySlug(state.selectedClosedLoopTaskSlug);
  if (!task) {
    detailNode.innerHTML = `<p class="lead">No closed-loop task metadata available.</p>`;
    return;
  }

  const mediaCards = task.media
    .map(
      (media) => `
        <div class="task-media-card closed-loop-media-card ${media.kind}">
          <video controls muted preload="metadata" src="${media.url}"></video>
          <div class="media-card-caption">
            <strong>${escapeHtml(media.label)}</strong>
            <span>${escapeHtml(task.slug)} / ${escapeHtml(media.relative_path)}</span>
          </div>
        </div>
      `,
    )
    .join("");
  const closedLoopRate = CLOSED_LOOP_SUCCESS_RATES[task.slug] || { successes: 0, total: 0 };
  const closedLoopGalleryNote =
    task.media.length < 4 && closedLoopRate.successes === closedLoopRate.total
      ? "Only success clips are shown because this task has 100% success in the 20-seed evaluation."
      : "";

  detailNode.innerHTML = `
    <div class="task-program-intro">
      <h3>${escapeHtml(getTaskDisplayName(task.slug))}</h3>
      <p>${escapeHtml(task.prompt_excerpt)}</p>
    </div>

    <div class="task-badges">
      <span class="task-badge">${escapeHtml(task.name)}</span>
      <span class="task-badge">WAN + V2T closed-loop</span>
      <span class="task-badge">${escapeHtml(task.config_path)}</span>
    </div>

    <div class="task-program-layout">
      <div class="task-columns">
        <div class="task-section-block">
          <span class="task-section-title">Task Prompt</span>
          <pre class="task-copy">${escapeHtml(task.prompt || task.prompt_excerpt)}</pre>
        </div>

        <div class="task-section-block">
          <span class="task-section-title">Negative Prompt</span>
          <pre class="task-copy">${escapeHtml(task.negative_prompt || task.negative_prompt_excerpt || "None")}</pre>
        </div>
      </div>

      <div class="task-media-stack closed-loop-media-stack">
        ${
          closedLoopGalleryNote
            ? `<p class="gallery-note">${escapeHtml(closedLoopGalleryNote)}</p>`
            : ""
        }
        <div class="closed-loop-video-grid">
          ${mediaCards}
        </div>
      </div>
    </div>
  `;
}

function selectClosedLoopTask(taskSlug) {
  state.selectedClosedLoopTaskSlug = taskSlug;
  renderClosedLoopSuccessRates();
  renderClosedLoopTaskSelector();
  renderClosedLoopTaskDetail();
  updateTaskTabReminder(
    "closed-loop-tab-reminder",
    getTaskDisplayName(taskSlug),
    "Click another tab to switch the prompt, success clips, and failure examples.",
  );
}

function renderDemoTaskSelector(selectorId, demos, selectedSlug, onSelect) {
  const selectorNode = document.getElementById(selectorId);
  if (!selectorNode) {
    return;
  }

  selectorNode.innerHTML = demos
    .map((demo) => {
      const isActive = demo.slug === selectedSlug;
      return `
        <button
          type="button"
          class="task-selector-card${isActive ? " is-active" : ""}"
          data-demo-task-slug="${demo.slug}"
        >
          <strong>${escapeHtml(demo.label || getTaskDisplayName(demo.slug))}</strong>
          <span>${escapeHtml(demo.name)}</span>
        </button>
      `;
    })
    .join("");

  selectorNode.querySelectorAll("[data-demo-task-slug]").forEach((node) => {
    node.addEventListener("click", () => {
      onSelect(node.dataset.demoTaskSlug);
    });
  });
}

function renderDemoTaskDetail(detailId, demos, selectedSlug, modeLabel) {
  const detailNode = document.getElementById(detailId);
  if (!detailNode) {
    return;
  }
  const demo = demos.find((item) => item.slug === selectedSlug);
  if (!demo) {
    detailNode.innerHTML = `<p class="lead">No demo metadata available.</p>`;
    return;
  }

  const media = demo.media || [
    {
      kind: "success",
      label: "Demo",
      relative_path: demo.video,
      url: demo.video,
    },
  ];
  const mediaCards = media
    .map(
      (item) => `
        <div class="task-media-card closed-loop-media-card ${item.kind}">
          <video controls muted preload="metadata" src="${item.url}"></video>
          <div class="media-card-caption">
            <strong>${escapeHtml(item.label)}</strong>
            <span>${escapeHtml(item.relative_path || item.url)}</span>
          </div>
        </div>
      `,
    )
    .join("");

  detailNode.innerHTML = `
    <div class="task-program-intro">
      <h3>${escapeHtml(demo.label || getTaskDisplayName(demo.slug))}</h3>
      <p>${escapeHtml(demo.description)}</p>
    </div>

    <div class="task-badges">
      <span class="task-badge">${escapeHtml(demo.name)}</span>
      <span class="task-badge">${escapeHtml(modeLabel)}</span>
    </div>

    <div class="task-program-layout">
      <div class="task-columns">
        <div class="task-section-block">
          <span class="task-section-title">Task Prompt</span>
          <pre class="task-copy">${escapeHtml(demo.prompt)}</pre>
        </div>
      </div>

      <div class="task-media-stack closed-loop-media-stack">
        ${
          demo.galleryNote
            ? `<p class="gallery-note">${escapeHtml(demo.galleryNote)}</p>`
            : ""
        }
        <div class="closed-loop-video-grid">
          ${mediaCards}
        </div>
      </div>
    </div>
  `;
}

function selectCrossEmbodimentTask(taskSlug) {
  state.selectedCrossEmbodimentTaskSlug = taskSlug;
  renderDemoTaskSelector(
    "cross-embodiment-task-selector",
    CROSS_EMBODIMENT_DEMOS,
    state.selectedCrossEmbodimentTaskSlug,
    selectCrossEmbodimentTask,
  );
  renderDemoTaskDetail(
    "cross-embodiment-task-detail",
    CROSS_EMBODIMENT_DEMOS,
    state.selectedCrossEmbodimentTaskSlug,
    "Cross-embodiment closed-loop",
  );
  updateTaskTabReminder(
    "cross-embodiment-tab-reminder",
    getTaskDisplayName(taskSlug),
    "Click another tab to compare shifted-embodiment success and failure cases.",
  );
}

function selectStressTestTask(taskSlug) {
  state.selectedStressTestTaskSlug = taskSlug;
  renderDemoTaskSelector(
    "stress-test-task-selector",
    STRESS_TEST_DEMOS,
    state.selectedStressTestTaskSlug,
    selectStressTestTask,
  );
  renderDemoTaskDetail(
    "stress-test-task-detail",
    STRESS_TEST_DEMOS,
    state.selectedStressTestTaskSlug,
    "Additional stress test",
  );
}

function toggleModes() {
  const modeNode = document.getElementById("mode");
  if (!modeNode) {
    return;
  }
  const mode = modeNode.value;
  document.querySelectorAll(".mode-field").forEach((node) => {
    const supportedModes = node.dataset.modes.split(",");
    node.classList.toggle("hidden", !supportedModes.includes(mode));
  });
}

function renderRunTable() {
  const tbody = document.getElementById("runs-list");
  if (!tbody) {
    return;
  }
  if (state.runs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No precomputed runs in this demo package.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = state.runs
    .map(
      (run) => `
        <tr class="${run.run_id === state.selectedRunId ? "active" : ""}" data-run-id="${run.run_id}">
          <td>${run.run_id}</td>
          <td><span class="dot ${run.status}"></span>${run.status}</td>
          <td>${run.task}</td>
          <td>${run.mode}</td>
          <td>${run.num_context}</td>
          <td>${run.num_planning_cycles}</td>
        </tr>
      `,
    )
    .join("");

  tbody.querySelectorAll("tr[data-run-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedRunId = row.dataset.runId;
      renderRunTable();
      loadDetail(state.selectedRunId);
    });
  });
}

function renderDetail(detail) {
  const view = document.getElementById("run-detail");
  if (!view) {
    return;
  }
  const summary = detail.summary || {};
  const artifacts = Array.isArray(detail.artifacts) ? detail.artifacts : [];
  const videos = artifacts.filter((artifact) => artifact.kind === "video");
  const images = artifacts.filter((artifact) => artifact.kind === "image");

  const framesValue = summary.num_frames_executed ?? "-";
  const errorValue = summary.mean_tracking_error ?? "-";
  const convergenceValue =
    summary.stop_reason ?? (summary.success === true ? "success" : summary.success === false ? "incomplete" : "-");

  view.innerHTML = `
    <h2 style="margin-top: 0">Run Inspector: ${detail.run_id || detail.task}</h2>
    <div class="metric-bar">
      <div><label>TASK</label><span>${detail.task}</span></div>
      <div><label>MODE</label><span>${detail.mode}</span></div>
      <div><label>STATUS</label><span>${String(detail.status).toUpperCase()}</span></div>
      <div><label>FRAMES</label><span>${framesValue}</span></div>
      <div><label>ERROR</label><span>${errorValue}</span></div>
      <div><label>STOP</label><span>${convergenceValue}</span></div>
    </div>

    <div class="media-grid">
      ${videos
        .map(
          (video) => `
            <div class="media-card">
              <video controls autoplay muted src="${video.url}"></video>
              <p>${video.relative_path}</p>
            </div>
          `,
        )
        .join("")}
      ${images
        .map(
          (image) => `
            <div class="media-card">
              <img src="${image.url}" alt="${image.relative_path}" />
              <p>${image.relative_path}</p>
            </div>
          `,
        )
        .join("")}
    </div>

    <div class="grid-2 detail-grid">
      <div>
        <label>Demo Log</label>
        <div class="code-panel"><pre>${escapeHtml(detail.log_tail || "No log output available.")}</pre></div>
      </div>
      <div>
        <label>SUMMARY.JSON</label>
        <div class="code-panel"><pre>${escapeHtml(JSON.stringify(summary, null, 2))}</pre></div>
      </div>
    </div>
  `;
}

function loadDetail(runId) {
  const detail = DEMO_DATA.runDetails[runId];
  if (!detail) {
    return;
  }
  renderDetail(detail);
}

function init() {
  buildRunDetails();
  populateSummary(DEMO_DATA.summary);

  state.tasks = getOrderedTasks(DEMO_DATA.tasks);
  state.closedLoopTasks = buildClosedLoopTasks();
  CROSS_EMBODIMENT_DEMOS = buildCrossEmbodimentDemos();
  state.runs = DEMO_DATA.runs.slice();

  const modeNode = document.getElementById("mode");
  const taskNode = document.getElementById("task");
  const wanModelNode = document.getElementById("wan_model");

  if (modeNode && taskNode && wanModelNode) {
    modeNode.innerHTML = DEMO_DATA.defaults.available_modes
      .map((mode) => `<option value="${mode.slug}">${mode.label}</option>`)
      .join("");
    taskNode.innerHTML = state.tasks
      .map((task) => `<option value="${task.slug}">${task.slug}</option>`)
      .join("");
    wanModelNode.innerHTML = DEMO_DATA.defaults.wan_models
      .map((model) => `<option value="${model.slug}">${model.slug}</option>`)
      .join("");

    document.getElementById("checkpoint").value = "/models/video2trajectory_demo.ckpt";
    document.getElementById("video_path").value = "/data/demo_input.mp4";
    document.getElementById("wan_image_url").value = "https://example.com/demo_frame.png";
    document.getElementById("wan_existing_video").value = "/data/wan_generated_demo.mp4";
    document.getElementById("closedloop_existing_video").value = "/data/closedloop_seed_video.mp4";
    document.getElementById("num_context").value = DEMO_DATA.defaults.v2t_model.num_context;
    document.getElementById("window_size").value = DEMO_DATA.defaults.v2t_model.window_size;
    document.getElementById("window_stride").value = DEMO_DATA.defaults.v2t_model.window_stride;
    document.getElementById("num_candidates").value = DEMO_DATA.defaults.v2t_model.num_candidates;
    document.getElementById("num_planning_cycles").value = DEMO_DATA.defaults.eval.num_planning_cycles;
    document.getElementById("pool_size").value = DEMO_DATA.defaults.retrieval.pool_size;
    document.getElementById("use_reference_trajectory").checked = DEMO_DATA.defaults.eval.use_reference_trajectory;
    wanModelNode.value = DEMO_DATA.defaults.eval.default_wan_model;
    modeNode.value = "wan_closedloop";
    taskNode.value = DEMO_DATA.defaults.eval.default_task;

    modeNode.addEventListener("change", toggleModes);
    taskNode.addEventListener("change", () => {
      selectTask(taskNode.value);
    });
    toggleModes();
    selectTask(taskNode.value);
  } else if (state.tasks.length > 0) {
    selectTask(DEMO_DATA.defaults.eval.default_task);
  }

  if (state.closedLoopTasks.length > 0) {
    selectClosedLoopTask(state.closedLoopTasks[0].slug);
  }
  if (CROSS_EMBODIMENT_DEMOS.length > 0) {
    selectCrossEmbodimentTask(CROSS_EMBODIMENT_DEMOS[0].slug);
  }
  if (STRESS_TEST_DEMOS.length > 0) {
    selectStressTestTask(STRESS_TEST_DEMOS[0].slug);
  }
  renderInContextMetricSelector();
  renderClosedLoopComparisonChart();

  const evalForm = document.getElementById("eval-form");
  if (evalForm) {
    evalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      document.getElementById("submit-status").textContent =
        "Static demo package: run launch disabled. Share the folder directly instead of starting a server.";
    });
  }

  renderRunTable();
  if (state.runs.length > 0) {
    state.selectedRunId = state.runs[0].run_id;
    renderRunTable();
    loadDetail(state.selectedRunId);
  }
}

init();
